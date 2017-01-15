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

        LightingManager.getStatusAllLamps();

        return SmartHouseApp.lightingConfigurationInstance.getLamps();
    };
}
