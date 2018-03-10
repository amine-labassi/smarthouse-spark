package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.IndexController;
import com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerController;
import com.chbinou.smarthouse.app.components.auth.AuthenticationController;
import com.chbinou.smarthouse.app.components.lighting.LightingController;
import com.chbinou.smarthouse.app.components.model.ElectronicInterfaceConfiguration;
import com.chbinou.smarthouse.app.config.Constantes.Url;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.chbinou.smarthouse.app.config.environment.Environment;
import com.chbinou.smarthouse.app.config.gpio.GpioFactoryAdapater;
import com.chbinou.smarthouse.app.config.schedule.CheckStatusPeriodicTask;
import com.chbinou.smarthouse.app.config.security.SecurityFilter;
import com.chbinou.smarthouse.app.config.security.SmartHouseSecurityConfigFactory;
import com.chbinou.smarthouse.app.config.websocket.CheckStatusWebSocket;
import com.chbinou.smarthouse.app.util.ConfigurationReader;
import com.google.gson.Gson;
import com.pi4j.io.gpio.GpioController;
import org.pac4j.core.config.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

import java.util.Timer;

import static com.chbinou.smarthouse.app.components.IndexController.optionsResponse;
import static com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerController.*;
import static com.chbinou.smarthouse.app.components.auth.AuthenticationController.*;
import static com.chbinou.smarthouse.app.components.lighting.LightingController.*;
import static com.chbinou.smarthouse.app.components.windows.WindowsController.*;
import static com.chbinou.smarthouse.app.config.GsonConfiguration.getGsonInstance;
import static com.chbinou.smarthouse.app.config.environment.Environment.*;
import static com.chbinou.smarthouse.app.util.ConfigurationReader.parseConfiguration;
import static spark.Spark.*;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SmartHouseApp
{

    private static Logger logger = LoggerFactory.getLogger(SmartHouseApp.class);
    public static final GpioController gpio = GpioFactoryAdapater.getInstance();
    public static final String JSON = "application/json";
    public static final String AUTHORIZERS = "hsts,nosniff,noframe,xssprotection,nocache";
    public static final String MATCHERS = "excludedPublicResources,securedHttpMethod";

    public static ElectronicInterfaceConfiguration lightingConfigurationInstance;

    public static Timer timer = new Timer();

    public static void main(String[] args) throws Exception
    {
        final Config config = new SmartHouseSecurityConfigFactory().build();
        Gson gson = GsonConfiguration.getGsonInstance();
        lightingConfigurationInstance = ConfigurationReader.parseConfiguration();
        if(Environment.isDevEnv()) {
             System.out.println("components are initialised");
        } else {
            ConfigurationReader.init();
        }
        port(Environment.port());
        secure(keyStore(), keyStorePassword(), trustStore(), trustStorePassword(), isSslTwoWay());

        webSocket(Url.API_PUSH_WSOCKET, CheckStatusWebSocket.class);

        CheckStatusPeriodicTask a = new CheckStatusPeriodicTask();
        a.start();
        //timer.schedule(new CheckStatusPeriodicTask(), 0, period());

        Spark.exception(Exception.class, (exception, request, response) -> {
            logger.error("SmartHouseApp main error", exception);
        });



        options("*",  optionsResponse);
        path(Url.PATH_API, () -> {
            before(Url.LOGIN, new SecurityFilter(config, "DirectFormClient", AUTHORIZERS, MATCHERS));
            post(Url.LOGIN, JSON, login);
            before(Url.ANY, new SecurityFilter(config, "HeaderClient", AUTHORIZERS, MATCHERS));
            path(Url.PATH_SWITCHING, () -> {
                path(Url.PATH_LAMP, () -> {
                    get(Url.API_STATUS_LAMP_ALL, JSON, getStatusAllLamp, gson::toJson);
                    get(Url.API_SWITCHON_LAMP, JSON, switchOnLamp, gson::toJson);
                    get(Url.API_SWITCHOFF_LAMP, JSON, switchOffLamp, gson::toJson);
                    get(Url.API_SWITCHON_LAMP_ALL, JSON, switchOnLampAll, gson::toJson);
                    get(Url.API_SWITCHOFF_LAMP_ALL, JSON, switchOffLampAll, gson::toJson);
                });
                path(Url.PATH_COOLER, () -> {
                    get(Url.API_SWITCHON_CLIMATISEUR, JSON, switchOnClimatiseur, gson::toJson);
                    get(Url.API_SWITCHOFF_CLIMATISEUR, JSON, switchOffClimatiseur, gson::toJson);
                    get(Url.API_SWITCHON_CLIMATISEUR, JSON, switchOnClimatiseurAll, gson::toJson);
                    get(Url.API_SWITCHOFF_CLIMATISEUR, JSON, switchOffClimatiseurAll, gson::toJson);
                });
                path(Url.PATH_WINDOW, () -> {
                    get(Url.API_SWITCHUP_WINDOW, JSON, switchUPWindow, gson::toJson);
                    get(Url.API_SWITCHDOWN_WINDOW, JSON, switchDownWindow, gson::toJson);
                    get(Url.API_SWITCHUP_WINDOW_ALL, JSON, switchUpWindowAll, gson::toJson);
                    get(Url.API_SWITCHDOWN_WINDOW_ALL, JSON, switchDownWindowAll, gson::toJson);
                    get(Url.API_POSITION_WINDOW, JSON, positionWindow, gson::toJson);
                    get(Url.API_STATUS_LAMP_ALL, JSON, getAllClimatiseurs, gson::toJson);
                });
            });
        });

    }
}
