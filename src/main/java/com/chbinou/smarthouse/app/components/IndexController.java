package com.chbinou.smarthouse.app.components;

import com.chbinou.smarthouse.app.config.Constantes;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

/**
 * Created by nxuser on 07/01/2017.
 */
public class IndexController
{

    public static Route notFoundResponse = (Request request, Response response) ->
    {
        Spark.halt(404,"Page non trouvée");
        return null;
    };

    public static Route optionsResponse = (Request request, Response response) ->
    {
        response.header("Access-Control-Allow-Headers", "Authorization");
        response.header("Access-Control-Allow-Methods", "GET,POST");
        response.header("Access-Control-Allow-Origin", request.headers("Origin"));
        response.status(204);
        return "OK";
    };
}
