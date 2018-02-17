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

        LightingManagerWrapper.getStatusAllLampsWrapper();

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };

    public static Route switchOnLamp = (request, response) ->
    {

        response.header("Content-Type","application/json");
        LightingManagerWrapper.switchOnLampWrapper(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };
    public static Route switchOffLamp  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManagerWrapper.switchOffLampWrapper(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOffLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManagerWrapper.switchOffLampAllWrapper();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOnLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        LightingManagerWrapper.switchOnLampAllWrapper();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };
}
