package com.chbinou.smarthouse.app.config.metrics;

import com.codahale.metrics.Counter;
import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Filter;
import spark.Request;
import spark.Response;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static com.codahale.metrics.MetricRegistry.name;

/**
 * Created by amine on 19/08/2017.
 */
public class InstrumentedFilter implements Filter
{
    protected Logger logger = LoggerFactory.getLogger(getClass());

    public static final String REGISTRY_ATTRIBUTE = InstrumentedFilter.class.getName() + ".registry";

    private static final String NAME_PREFIX = "responseCodes.";
    private static final int OK = 200;
    private static final int CREATED = 201;
    private static final int NO_CONTENT = 204;
    private static final int BAD_REQUEST = 400;
    private static final int UNAUTHORIZED = 401;
    private static final int NOT_FOUND = 404;
    private static final int SERVER_ERROR = 500;

    static final String METRIC_PREFIX = "name-prefix";

    private final String otherMetricName;
    private final Map<Integer, String> meterNamesByStatusCode;
    private final String registryAttribute;

    // initialized after call of init method
    private static ConcurrentMap<Integer, Meter> metersByStatusCode;
    private static Meter otherMeter;
    private static Meter timeoutsMeter;
    private static Meter errorsMeter;
    private static Counter activeRequests;
    private static Timer requestTimer;
    private FilterStep filterStep;

    private static ThreadLocal<Timer.Context> contextTimer = new ThreadLocal<Timer.Context>();

    public InstrumentedFilter(FilterStep filterStep)
    {
        this.otherMetricName = NAME_PREFIX + "other";
        this.meterNamesByStatusCode = createMeterNamesByStatusCode();
        this.registryAttribute = REGISTRY_ATTRIBUTE;
        this.filterStep = filterStep;
        init();
    }

    private static Map<Integer, String> createMeterNamesByStatusCode() {
        final Map<Integer, String> meterNamesByStatusCode = new HashMap<Integer, String>(6);
        meterNamesByStatusCode.put(OK, NAME_PREFIX + "ok");
        meterNamesByStatusCode.put(UNAUTHORIZED, NAME_PREFIX + "unauthorized");
        meterNamesByStatusCode.put(NOT_FOUND, NAME_PREFIX + "notFound");
        meterNamesByStatusCode.put(SERVER_ERROR, NAME_PREFIX + "serverError");
        return meterNamesByStatusCode;
    }

    protected void init()
    {
        final MetricRegistry metricsRegistry = MetricsConfigurer.metricRegistry;

        String metricName = "jvm.app.api";

        /*this.metersByStatusCode = new ConcurrentHashMap<Integer, Meter>(meterNamesByStatusCode
                .size());
        for (Map.Entry<Integer, String> entry : meterNamesByStatusCode.entrySet()) {
            metersByStatusCode.put(entry.getKey(),
                    metricsRegistry.meter(name(metricName, entry.getValue())));
        }
        this.otherMeter = metricsRegistry.meter(name(metricName,
                otherMetricName));
        this.timeoutsMeter = metricsRegistry.meter(name(metricName,
                "timeouts"));
        this.errorsMeter = metricsRegistry.meter(name(metricName,
                "errors"));
        this.activeRequests = metricsRegistry.counter(name(metricName,
                "activeRequests"));*/
        this.requestTimer = metricsRegistry.timer(name(metricName,
                "requests"));
    }

    @Override
    public void handle(Request request, Response response) throws Exception
    {
        switch (filterStep)
        {
            case BEFORE:
                logger.trace("###### Filter before : " + request.url());
                //activeRequests.inc();
                contextTimer.set(requestTimer.time());
                logger.trace("###### Filter before Out");
                break;
            case AFTER_AFTER:
                logger.trace("###### Filter after : " + request.url() + "," + response.status());
                if(contextTimer.get() != null)
                {
                    logger.trace("###### Filter after : monitoring executed ");
                    contextTimer.get().stop();
                    contextTimer.remove();
                    //activeRequests.dec();
                    //markMeterForStatusCode(response.status());
                    /*if(response.status() == 500)
                    {
                        errorsMeter.mark();
                    }*/
                }
                logger.trace("###### Filter after Out");
                break;
        }

    }

    private void markMeterForStatusCode(int status)
    {
        final Meter metric = metersByStatusCode.get(status);
        if (metric != null) {
            metric.mark();
        } else {
            otherMeter.mark();
        }
    }

    public static enum FilterStep
    {
        BEFORE, AFTER_AFTER;
    }
}
