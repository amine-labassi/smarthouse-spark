package com.chbinou.smarthouse.app.config;

/**
 * Created by nxuser on 07/01/2017.
 */
public class Constantes
{
    public interface Url
    {
        String ANY                          = "*";
        String DEFAULT                      = "/";
        String SECURE                       = "/api/*";

        String LIGHTNING                    = "/api/switching";
        String STATUS_LAMP_ALL              = "/api/switching/lamp/all/status";
        String SWITCHON_LAMP                = "/api/switching/lamp/:identifier/on";
        String SWITCHOFF_LAMP               = "/api/switching/lamp/:identifier/off";
        String SWITCHON_LAMP_ALL            = "/api/switching/lamp/all/on";
        String SWITCHOFF_LAMP_ALL           = "/api/switching/lamp/all/off";

        String STATUS_CLIMATISEUR_ALL       = "/api/switching/lamp/all/status";
        String SWITCHON_CLIMATISEUR         = "/api/switching/lamp/:identifier/on";
        String SWITCHOFF_CLIMATISEUR        = "/api/switching/lamp/:identifier/off";
        String SWITCHON_CLIMATISEUR_ALL     = "/api/switching/lamp/all/on";
        String SWITCHOFF_CLIMATISEUR_ALL    = "/api/switching/lamp/all/off";

        String SWITCHUP_WINDOW              = "/api/switching/window/:identifier/up";
        String SWITCHDOWN_WINDOW            = "/api/switching/window/:identifier/down";
        String SWITCHUP_WINDOW_ALL          = "/api/switching/window/all/up";
        String SWITCHDOWN_WINDOW_ALL        = "/api/switching/window/all/down";


        // windows


    }

    public interface Views
    {
        String INDEX_PAGE            = "/app/www/index.html";
    }
}
