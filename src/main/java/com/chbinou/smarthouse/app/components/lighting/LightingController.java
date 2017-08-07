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

        MockLightingManager.mockGetStatusAllLamps();

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };

    public static Route switchOnLamp = (request, response) ->
    {

        response.header("Content-Type","application/json");
        MockLightingManager.mockSwitchOnLamp(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones();
    };
    public static Route switchOffLamp  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        MockLightingManager.mockSwitchOffLamp(request.params("identifierzone"),request.params("identifier"));

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOffLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        MockLightingManager.mockSwitchOffLampAll();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };

    public static Route switchOnLampAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        MockLightingManager.mockSwitchOnLampAll();

        return SmartHouseApp.lightingConfigurationInstance.getZones() ;
    };
}
