package com.chbinou.smarthouse.app.components.airconditionner;

import com.chbinou.smarthouse.app.SmartHouseApp;
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


        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };

    public static Route switchOnClimatiseur = (request, response) ->
    {

        response.header("Content-Type","application/json");
        AirConditionnerManagerWrapper.switchOnClimatiseurWrapper(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };
    public static Route switchOffClimatiseur  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        AirConditionnerManagerWrapper.switchOffClimatiseurWrapper(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOffClimatiseurAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        AirConditionnerManagerWrapper.switchOffClimatiseurAllWrapper();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOnClimatiseurAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        AirConditionnerManagerWrapper.switchOnClimatiseurAllWrapper();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };
}
