package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.IndexController;
import com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerController;
import com.chbinou.smarthouse.app.components.auth.AuthenticationController;
import com.chbinou.smarthouse.app.components.lighting.LightingController;
import com.chbinou.smarthouse.app.components.model.ElectronicInterfaceConfiguration;
import com.chbinou.smarthouse.app.components.windows.WindowsController;
import com.chbinou.smarthouse.app.config.Constantes;
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
import spark.Filter;
import spark.Spark;

import java.util.Timer;

import static com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerController.*;
import static com.chbinou.smarthouse.app.components.auth.AuthenticationController.*;
import static com.chbinou.smarthouse.app.components.lighting.LightingController.*;
import static com.chbinou.smarthouse.app.components.windows.WindowsController.*;
import static spark.Spark.*;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SmartHouseApp
{

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
        secure(Environment.keyStore(),Environment.keyStorePassword(),Environment.trustStore(),
                Environment.trustStorePassword(), Environment.isSslTwoWay());

        webSocket(Constantes.Url.API_PUSH_WSOCKET, CheckStatusWebSocket.class);
        timer.schedule(new CheckStatusPeriodicTask(), 0, Environment.period());
        Spark.exception(Exception.class, (exception, request, response) -> {
            exception.printStackTrace();
        });

        options("*",  IndexController.optionsResponse);
        path(Constantes.Url.PATH_API, () -> {
            before(Constantes.Url.LOGIN, new SecurityFilter(config, "DirectFormClient", AUTHORIZERS, MATCHERS));
            post(Constantes.Url.LOGIN, JSON, login);
            before(Constantes.Url.ANY, new SecurityFilter(config, "HeaderClient", AUTHORIZERS, MATCHERS));
            path(Constantes.Url.PATH_SWITCHING, () -> {
                path(Constantes.Url.PATH_LAMP, () -> {
                    get(Constantes.Url.API_STATUS_LAMP_ALL, JSON, getStatusAllLamp, gson::toJson);
                    get(Constantes.Url.API_SWITCHON_LAMP, JSON, switchOnLamp, gson::toJson);
                    get(Constantes.Url.API_SWITCHOFF_LAMP, JSON, switchOffLamp, gson::toJson);
                    get(Constantes.Url.API_SWITCHON_LAMP_ALL, JSON, switchOnLampAll, gson::toJson);
                    get(Constantes.Url.API_SWITCHOFF_LAMP_ALL, JSON, switchOffLampAll, gson::toJson);
                });
                path(Constantes.Url.PATH_COOLER, () -> {
                    get(Constantes.Url.API_SWITCHON_CLIMATISEUR, JSON, switchOnClimatiseur, gson::toJson);
                    get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, JSON, switchOffClimatiseur, gson::toJson);
                    get(Constantes.Url.API_SWITCHON_CLIMATISEUR, JSON, switchOnClimatiseurAll, gson::toJson);
                    get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, JSON, switchOffClimatiseurAll, gson::toJson);
                });
                path(Constantes.Url.PATH_WINDOW, () -> {
                    get(Constantes.Url.API_SWITCHUP_WINDOW, JSON, switchUPWindow, gson::toJson);
                    get(Constantes.Url.API_SWITCHDOWN_WINDOW, JSON, switchDownWindow, gson::toJson);
                    get(Constantes.Url.API_SWITCHUP_WINDOW_ALL, JSON, switchUpWindowAll, gson::toJson);
                    get(Constantes.Url.API_SWITCHDOWN_WINDOW_ALL, JSON, switchDownWindowAll, gson::toJson);
                    get(Constantes.Url.API_POSITION_WINDOW, JSON, positionWindow, gson::toJson);
                    get(Constantes.Url.API_STATUS_LAMP_ALL, JSON, getAllClimatiseurs, gson::toJson);
                });
            });
        });

    }
}
