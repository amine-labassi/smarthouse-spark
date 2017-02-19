package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.IndexController;
import com.chbinou.smarthouse.app.components.auth.AuthenticationController;
import com.chbinou.smarthouse.app.components.lighting.LightingController;
import com.chbinou.smarthouse.app.components.model.ElectronicInterfaceConfiguration;
import com.chbinou.smarthouse.app.components.electronicinterface.InterfaceElectronicController;
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
        //System.setProperty(org.slf4j.impl.SimpleLogger.DEFAULT_LOG_LEVEL_KEY, "INFO");

        final Config config = new SmartHouseSecurityConfigFactory().build();

        Gson gson = GsonConfiguration.getGsonInstance();

        lightingConfigurationInstance = ConfigurationReader.parseConfiguration();
        ConfigurationReader.init();

        port(80);
        staticFiles.location("/public");

        Spark.exception(Exception.class, (exception, request, response) -> {
            exception.printStackTrace();
        });

        before(Constantes.Url.LOGIN, new SecurityFilter(config, "DirectFormClient", "hsts,nosniff,noframe,xssprotection,nocache"));
        before(Constantes.Url.API_SECURE, new SecurityFilter(config, "HeaderClient", "hsts,nosniff,noframe,xssprotection,nocache"));

        // login request
        post(Constantes.Url.LOGIN,"application/json" ,AuthenticationController.login, gson::toJson);

        // secure API
        get(Constantes.Url.DEFAULT, "application/json", IndexController.serveDefaultPage);
        get(Constantes.Url.API_STATUS_LAMP_ALL, "application/json", LightingController.getStatusAllLamp, gson::toJson);
        get(Constantes.Url.API_SWITCHON_LAMP, "application/json", InterfaceElectronicController.switchOnLamp, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_LAMP, "application/json", InterfaceElectronicController.switchOffLamp, gson::toJson);
        get(Constantes.Url.API_SWITCHON_LAMP_ALL, "application/json", InterfaceElectronicController.switchOnLampAll, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_LAMP_ALL, "application/json", InterfaceElectronicController.switchOffLampAll, gson::toJson);
        get(Constantes.Url.API_SWITCHUP_WINDOW, "application/json", InterfaceElectronicController.switchUPWindow, gson::toJson);
        get(Constantes.Url.API_SWITCHDOWN_WINDOW, "application/json", InterfaceElectronicController.switchDownWindow, gson::toJson);
        get(Constantes.Url.API_SWITCHUP_WINDOW_ALL, "application/json", InterfaceElectronicController.switchUpWindowAll, gson::toJson);
        get(Constantes.Url.API_SWITCHDOWN_WINDOW_ALL, "application/json", InterfaceElectronicController.switchDownWindowAll, gson::toJson);
        get(Constantes.Url.API_STATUS_LAMP_ALL, "application/json", InterfaceElectronicController.getAllClimatiseurs, gson::toJson);
        get(Constantes.Url.API_SWITCHON_CLIMATISEUR, "application/json", InterfaceElectronicController.switchOnClimatiseur, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, "application/json", InterfaceElectronicController.switchOffClimatiseur, gson::toJson);
        get(Constantes.Url.API_SWITCHON_CLIMATISEUR, "application/json", InterfaceElectronicController.switchOnClimatiseurAll, gson::toJson);
        get(Constantes.Url.API_SWITCHOFF_CLIMATISEUR, "application/json", InterfaceElectronicController.switchOffClimatiseurAll, gson::toJson);

        // 404
        get(Constantes.Url.ANY, "*/*", IndexController.notFoundResponse);

    }
}
