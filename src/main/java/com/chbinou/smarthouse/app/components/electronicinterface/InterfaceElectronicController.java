package com.chbinou.smarthouse.app.components.electronicinterface;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerManager;
import com.chbinou.smarthouse.app.components.lighting.LightingManager;
import com.chbinou.smarthouse.app.components.model.AirConditionner;
import com.chbinou.smarthouse.app.components.windows.WindowsManager;
import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Window;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by nxuser on 07/01/2017.
 */

public class InterfaceElectronicController
{



    public static Route switchOnLamp = (request, response) ->
    {

        response.header("Content-Type","application/json");



        Lamp lamp = SmartHouseApp.lightingConfigurationInstance.getLamps().stream().filter(o -> o.getIdentifier().equals(request.params(":identifier"))).findFirst().get();


        LightingManager.switchOnLamp(lamp);

        return SmartHouseApp.lightingConfigurationInstance.getLamps();
    };
    public static Route switchOffLamp  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        Lamp lamp = SmartHouseApp.lightingConfigurationInstance.getLamps().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();

        LightingManager.switchOffLamp(lamp);

        return SmartHouseApp.lightingConfigurationInstance.getLamps() ;
    };

    public static Route switchOffLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManager. switchOffLampAll();

        return SmartHouseApp.lightingConfigurationInstance.getLamps() ;
    };

    public static Route switchOnLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManager. switchOnLampAll();

        return SmartHouseApp.lightingConfigurationInstance.getLamps() ;
    };

    public static Route switchUPWindow  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        Window window = SmartHouseApp.lightingConfigurationInstance.getWindows().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();
        WindowsManager.switchUPWindow(window);

        return true ;
    };

    public static Route switchDownWindow  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        Window window = SmartHouseApp.lightingConfigurationInstance.getWindows().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();
        WindowsManager.switchDownWindow(window);

        return true ;
    };

    public static Route switchUpWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        WindowsManager.switchUPWindowAll();

        return true ;
    };

    public static Route switchDownWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        WindowsManager.switchDownWindowAll();

        return true ;
    };

    public static Route getAllClimatiseurs = (Request request, Response response) ->
    {
        response.header("Content-Type","application/json");


        return SmartHouseApp.lightingConfigurationInstance.getAirConditionners();
    };

    public static Route switchOnClimatiseur = (request, response) ->
    {

        response.header("Content-Type","application/json");

        AirConditionner airConditionner = SmartHouseApp.lightingConfigurationInstance.getAirConditionners().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();


        AirConditionnerManager.switchOnClimatiseur(airConditionner);

        return SmartHouseApp.lightingConfigurationInstance.getAirConditionners();
    };
    public static Route switchOffClimatiseur  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        AirConditionner airConditionner = SmartHouseApp.lightingConfigurationInstance.getAirConditionners().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();

        AirConditionnerManager.switchOffClimatiseur(airConditionner);

        return SmartHouseApp.lightingConfigurationInstance.getAirConditionners() ;
    };

    public static Route switchOffClimatiseurAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        AirConditionnerManager. switchOffClimatiseurAll();

        return SmartHouseApp.lightingConfigurationInstance.getAirConditionners() ;
    };

    public static Route switchOnClimatiseurAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        AirConditionnerManager.switchOnClimatiseurAll();

        return SmartHouseApp.lightingConfigurationInstance.getAirConditionners() ;
    };

}
