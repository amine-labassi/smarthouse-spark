package com.chbinou.smarthouse.app;

import com.chbinou.smarthouse.app.components.index.IndexController;
import com.chbinou.smarthouse.app.components.lightning.LightningController;
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


    public static void main(String[] args)
    {
        Gson gson = GsonConfiguration.getGsonInstance();

        port(80);
        staticFiles.location("/public");

        before(SecurityFilter.ensureCallSecured());

        get(Constantes.Url.DEFAULT, IndexController.serveDefaultPage);
        get("/api/lightning/alllamps", LightningController.getAllLamps, gson::toJson);

        get(Constantes.Url.ANY, IndexController.notFoundResponse);
    }
}
