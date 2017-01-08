package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.index.IndexController;
import com.chbinou.smarthouse.app.components.lightning.LightingController;
import com.chbinou.smarthouse.app.config.Constantes;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.chbinou.smarthouse.app.security.SecurityFilter;
import com.google.gson.Gson;

import static spark.Spark.*;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SmartHouseApp
{
    public static void main(String[] args) throws Exception
    {
        Gson gson = GsonConfiguration.getGsonInstance();

        port(80);
        staticFiles.location("/public");

        before(SecurityFilter.ensureCallSecured());

        get(Constantes.Url.DEFAULT, IndexController.serveDefaultPage);
        get(Constantes.Url.STATUS_LAMP_ALL, LightingController.getAllLamps, gson::toJson);
        get(Constantes.Url.SWITCHON_LAMP, LightingController.switchOnLamp, gson::toJson);

        // 404
        get(Constantes.Url.ANY, IndexController.notFoundResponse);

    }
}
