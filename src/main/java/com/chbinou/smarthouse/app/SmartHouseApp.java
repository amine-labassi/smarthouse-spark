package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.IndexController;
import com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerController;
import com.chbinou.smarthouse.app.components.auth.AuthenticationController;
import com.chbinou.smarthouse.app.components.lighting.LightingController;
import com.chbinou.smarthouse.app.components.model.ElectronicInterfaceConfiguration;
import com.chbinou.smarthouse.app.components.windows.WindowsController;
import com.chbinou.smarthouse.app.config.Constantes;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.chbinou.smarthouse.app.config.security.SecurityFilter;
import com.chbinou.smarthouse.app.config.security.SmartHouseSecurityConfigFactory;
import com.chbinou.smarthouse.app.util.ConfigurationReader;
import com.google.gson.Gson;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import org.pac4j.core.config.Config;
import spark.Spark;

import static spark.Spark.*;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SmartHouseApp
{

    public static final GpioController gpio = GpioFactory.getInstance();

    public static ElectronicInterfaceConfiguration lightingConfigurationInstance;

    public static void main(String[] args) throws Exception
    {
        System.setProperty(org.slf4j.impl.SimpleLogger.DEFAULT_LOG_LEVEL_KEY, "INFO");

        final Config config = new SmartHouseSecurityConfigFactory().build();

        Gson gson = GsonConfiguration.getGsonInstance();

        lightingConfigurationInstance = ConfigurationReader.parseConfiguration();
        ConfigurationReader.init();

        port(80);
        staticFiles.location("/public");

        Spark.exception(Exception.class, (exception, request, response) -> {
            exception.printStackTrace();
        });

      options("*//*",  (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");

            if (accessControlRequestHeaders != null)
            {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");

            if (accessControlRequestMethod != null)
            {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

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
        get(Constantes.Url.API_STATUS_LAMP_ALL, "application/json", AirConditionnerController.getAllClimatiseurs, gson::toJson);
        get(Constantes.Url.API_SWITCHON_CLIMATISEUR, "application/json", AirConditionnerController.switchOnClimatiseur, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, "application/json", AirConditionnerController.switchOffClimatiseur, gson::toJson);
        get(Constantes.Url.API_SWITCHON_CLIMATISEUR, "application/json", AirConditionnerController.switchOnClimatiseurAll, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, "application/json", AirConditionnerController.switchOffClimatiseurAll, gson::toJson);

        // 404
        get(Constantes.Url.ANY, "*/*", IndexController.notFoundResponse);

    }
}
