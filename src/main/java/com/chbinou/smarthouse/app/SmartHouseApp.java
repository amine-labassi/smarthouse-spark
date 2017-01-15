package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.IndexController;
import com.chbinou.smarthouse.app.components.lighting.LightingController;
import com.chbinou.smarthouse.app.components.model.ElectronicInterfaceConfiguration;
import com.chbinou.smarthouse.app.components.electronicinterface.InterfaceElectronicController;
import com.chbinou.smarthouse.app.config.Constantes;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.chbinou.smarthouse.app.security.SecurityFilter;
import com.chbinou.smarthouse.app.util.ConfigurationReader;
import com.google.gson.Gson;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;

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
        Gson gson = GsonConfiguration.getGsonInstance();

        lightingConfigurationInstance = ConfigurationReader.parseConfiguration();
        ConfigurationReader.init();

        port(80);
        staticFiles.location("/public");

        before(SecurityFilter.ensureCallSecured());

        get(Constantes.Url.DEFAULT, IndexController.serveDefaultPage);
        get(Constantes.Url.STATUS_LAMP_ALL, LightingController.getStatusAllLamp, gson::toJson);
        get(Constantes.Url.SWITCHON_LAMP, InterfaceElectronicController.switchOnLamp, gson::toJson);
        get(Constantes.Url.SWITCHOFF_LAMP, InterfaceElectronicController.switchOffLamp, gson::toJson);
        get(Constantes.Url.SWITCHON_LAMP_ALL, InterfaceElectronicController.switchOnLampAll, gson::toJson);
        get(Constantes.Url.SWITCHOFF_LAMP_ALL, InterfaceElectronicController.switchOffLampAll, gson::toJson);
        get(Constantes.Url.SWITCHUP_WINDOW, InterfaceElectronicController.switchUPWindow, gson::toJson);
        get(Constantes.Url.SWITCHDOWN_WINDOW, InterfaceElectronicController.switchDownWindow, gson::toJson);
        get(Constantes.Url.SWITCHUP_WINDOW_ALL, InterfaceElectronicController.switchUpWindowAll, gson::toJson);
        get(Constantes.Url.SWITCHDOWN_WINDOW_ALL, InterfaceElectronicController.switchDownWindowAll, gson::toJson);
        get(Constantes.Url.STATUS_LAMP_ALL, InterfaceElectronicController.getAllClimatiseurs, gson::toJson);
        get(Constantes.Url.SWITCHON_CLIMATISEUR, InterfaceElectronicController.switchOnClimatiseur, gson::toJson);
        get(Constantes.Url.SWITCHOFF_CLIMATISEUR, InterfaceElectronicController.switchOffClimatiseur, gson::toJson);
        get(Constantes.Url.SWITCHON_CLIMATISEUR, InterfaceElectronicController.switchOnClimatiseurAll, gson::toJson);
        get(Constantes.Url.SWITCHOFF_CLIMATISEUR, InterfaceElectronicController.switchOffClimatiseurAll, gson::toJson);
        // 404
        get(Constantes.Url.ANY, IndexController.notFoundResponse);

    }
}
