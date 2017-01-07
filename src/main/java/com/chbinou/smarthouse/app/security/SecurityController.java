package com.chbinou.smarthouse.app.security;

import com.chbinou.smarthouse.app.config.Constantes;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SecurityController
{
    public static Route authentificateUser = (Request request, Response response) ->
    {
        response.redirect(Constantes.Views.INDEX_PAGE, 301);
        return null;
    };
}
