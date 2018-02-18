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
import spark.Spark;

import java.util.Timer;

import static spark.Spark.*;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SmartHouseApp
{

    public static final GpioController gpio = GpioFactoryAdapater.getInstance();

    public static ElectronicInterfaceConfiguration lightingConfigurationInstance;

    public static Timer timer = new Timer();

    public static void main(String[] args) throws Exception
    {
        final Config config = new SmartHouseSecurityConfigFactory().build();

        Gson gson = GsonConfiguration.getGsonInstance();

        lightingConfigurationInstance = ConfigurationReader.parseConfiguration();
        if(Environment.isDevEnv())
        {
             System.out.println("components are initialised");
        }
        else
        {
            ConfigurationReader.init();
        }

        port(Environment.port());

        secure(Environment.keyStore(),Environment.keyStorePassword(),Environment.trustStore(),
                Environment.trustStorePassword(), Environment.isSslTwoWay());

        // push status web socket
        webSocket(Constantes.Url.API_PUSH_WSOCKET, CheckStatusWebSocket.class);

        before((request, response) -> {
            final String url = request.url();
            if (url.startsWith("http://"))
            {
                final String[] split = url.split("http://");
                response.redirect("https://" + split[1]);
            }
        });

        timer.schedule(new CheckStatusPeriodicTask(), 0);

        Spark.exception(Exception.class, (exception, request, response) -> {
            exception.printStackTrace();
        });

        options("*",  IndexController.optionsResponse);

        /*before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
        before((request, response) -> response.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS"));
        before((request, response) -> response.header("Access-Control-Allow-Headers", "Authorization"));*/

        before(Constantes.Url.LOGIN, new SecurityFilter(config, "DirectFormClient", "hsts,nosniff,noframe,xssprotection,nocache","excludedPublicResources,securedHttpMethod"));
        before(Constantes.Url.API_SECURE, new SecurityFilter(config, "HeaderClient", "hsts,nosniff,noframe,xssprotection,nocache", "excludedPublicResources,securedHttpMethod"));

        // login request*/
        post(Constantes.Url.LOGIN,"application/json" ,AuthenticationController.login);

        // secure API
        get(Constantes.Url.DEFAULT, "application/json", IndexController.serveDefaultPage);
        get(Constantes.Url.API_STATUS_LAMP_ALL, "application/json", LightingController.getStatusAllLamp, gson::toJson);
        get(Constantes.Url.API_SWITCHON_LAMP, "application/json", LightingController.switchOnLamp, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_LAMP, "application/json", LightingController.switchOffLamp, gson::toJson);
        get(Constantes.Url.API_SWITCHON_LAMP_ALL, "application/json", LightingController.switchOnLampAll, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_LAMP_ALL, "application/json", LightingController.switchOffLampAll, gson::toJson);
        get(Constantes.Url.API_SWITCHUP_WINDOW, "application/json", WindowsController.switchUPWindow, gson::toJson);
        get(Constantes.Url.API_SWITCHDOWN_WINDOW, "application/json", WindowsController.switchDownWindow, gson::toJson);
        get(Constantes.Url.API_SWITCHUP_WINDOW_ALL, "application/json", WindowsController.switchUpWindowAll, gson::toJson);
        get(Constantes.Url.API_SWITCHDOWN_WINDOW_ALL, "application/json", WindowsController.switchDownWindowAll, gson::toJson);
        get(Constantes.Url.API_POSITION_WINDOW, "application/json", WindowsController.positionWindow, gson::toJson);
        get(Constantes.Url.API_STATUS_LAMP_ALL, "application/json", AirConditionnerController.getAllClimatiseurs, gson::toJson);
        get(Constantes.Url.API_SWITCHON_CLIMATISEUR, "application/json", AirConditionnerController.switchOnClimatiseur, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, "application/json", AirConditionnerController.switchOffClimatiseur, gson::toJson);
        get(Constantes.Url.API_SWITCHON_CLIMATISEUR, "application/json", AirConditionnerController.switchOnClimatiseurAll, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, "application/json", AirConditionnerController.switchOffClimatiseurAll, gson::toJson);
//        // 404
//        get(Constantes.Url.ANY, "*/*", IndexController.notFoundResponse);

    }
}
