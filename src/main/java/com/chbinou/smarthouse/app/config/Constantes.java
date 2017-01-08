package com.chbinou.smarthouse.app.config;

/**
 * Created by nxuser on 07/01/2017.
 */
public class Constantes
{
    public interface Url
    {
        String ANY                  = "*";
        String DEFAULT              = "/";
        String SECURE               = "/api/*";
        String LIGHTNING            = "/api/lightning";
        String STATUS_LAMP_ALL      = "/api/lightning/lamp/all/status";
        String SWITCHON_LAMP        = "/api/lightning/lamp/:identifier/on";
        String SWITCHOFF_LAMP       = "/api/lightning/lamp/:identifier/off";
        String SWITCHON_LAMP_ALL    = "/api/lightning/lamp/all/on";
        String SWITCHOFF_LAMP_ALL   = "/api/lightning/lamp/all/off";

        // windows


    }

    public interface Views
    {
        String INDEX_PAGE            = "/app/index.html";
    }
}
