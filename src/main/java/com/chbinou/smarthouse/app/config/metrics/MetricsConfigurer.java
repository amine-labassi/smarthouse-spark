package com.chbinou.smarthouse.app.config.metrics;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Slf4jReporter;
import com.codahale.metrics.jvm.CachedThreadStatesGaugeSet;
import com.codahale.metrics.jvm.GarbageCollectorMetricSet;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * Created by amine on 19/08/2017.
 */
public class MetricsConfigurer
{

    public static MetricRegistry metricRegistry = new MetricRegistry();

    public static Slf4jReporter reporter = Slf4jReporter.forRegistry(metricRegistry)
            .outputTo(LoggerFactory.getLogger("com.chbinou.smarthouse.app.metrics"))
            .convertRatesTo(TimeUnit.SECONDS)
            .convertDurationsTo(TimeUnit.MILLISECONDS)
            .build();

    public static void configure()
    {
        reporter.start(120, TimeUnit.SECONDS);

        metricRegistry.register("jvm.memory", new JvmMetricsSet());
        metricRegistry.register("jvm.gc", new GarbageCollectorMetricSet());
        //metricRegistry.register("jvm.threads", new CachedThreadStatesGaugeSet(10, TimeUnit.SECONDS));
    }
}
