package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.SmartHouseApp;
import spark.Route;

/**
 * Created by yassine on 15/01/2017.
 */
public class LightingController
{
    public static Route getStatusAllLamp = (request, response) ->
    {

        response.header("Content-Type","application/json");

        //LightingManager.getStatusAllLamps();

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };

    public static Route switchOnLamp = (request, response) ->
    {

        response.header("Content-Type","application/json");





        LightingManager.switchOnLamp(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };
    public static Route switchOffLamp  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManager.switchOffLamp(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOffLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManager. switchOffLampAll();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOnLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManager. switchOnLampAll();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };
}
