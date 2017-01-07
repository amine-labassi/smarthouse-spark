package com.chbinou.smarthouse.app.components.index;

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
}
