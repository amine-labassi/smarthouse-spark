package com.chbinou.smarthouse.app.components.lightning;

import com.chbinou.smarthouse.app.config.Constantes;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by nxuser on 07/01/2017.
 */
public class LightningController
{
    public static Route getAllLamps = (request, response) ->
    {
        response.header("Content-Type","application/json");
        Lamp lamp = new Lamp();
        lamp.setIdentifier("Lamp Salon");
        return lamp;
    };
}
