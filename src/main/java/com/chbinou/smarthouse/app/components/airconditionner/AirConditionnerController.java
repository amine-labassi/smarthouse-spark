package com.chbinou.smarthouse.app.components.airconditionner;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.AirConditionner;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by yassine on 15/01/2017.
 */
public class AirConditionnerController
{
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
