package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Lamp;
import spark.Route;

/**
 * Created by yassine on 15/01/2017.
 */
public class LightingController
{
    public static Route getStatusAllLamp = (request, response) ->
    {

        response.header("Content-Type","application/json");

        LightingManager.getStatusAllLamps();

        return SmartHouseApp.lightingConfigurationInstance.getLamps();
    };

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
}
