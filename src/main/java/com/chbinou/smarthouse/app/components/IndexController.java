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
    public static Route serveDefaultPage = (Request request, Response response) ->
    {
        response.redirect(Constantes.Views.INDEX_PAGE, 301);
        return null;
    };

    public static Route notFoundResponse = (Request request, Response response) ->
    {
        Spark.halt(404,"Page non trouvée");
        return null;
    };

    public static Route optionsResponse = (Request request, Response response) ->
    {
        String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");

        if (accessControlRequestHeaders != null)
        {
            response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
        }

        String accessControlRequestMethod = request.headers("Access-Control-Request-Method");

        if (accessControlRequestMethod != null)
        {
            response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
        }

        response.header("Access-Control-Allow-Origin", "*");

        return "OK";
    };
}
