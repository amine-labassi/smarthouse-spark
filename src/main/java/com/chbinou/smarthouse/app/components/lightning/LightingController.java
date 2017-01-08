package com.chbinou.smarthouse.app.components.lightning;

import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by nxuser on 07/01/2017.
 */
public class LightingController
{

    public static Route getAllLamps = (Request request, Response response) ->
    {
        response.header("Content-Type","application/json");


        return LightingConfiguration.instance.getLamps();
    };

    public static Route switchOnLamp = (request, response) ->
    {
        response.header("Content-Type","application/json");

        LightingManager.switchOnLamp("1");

        return true;
    };
}
