package com.chbinou.smarthouse.app.config;

/**
 * Created by nxuser on 07/01/2017.
 */
public class Constantes
{
    public interface Url
    {
        String LOGIN                            = "/login";
        String ANY                              = "*";
        String DEFAULT                          = "/";

        String API_SECURE                       = "/api/*";

        String API_PUSH_WSOCKET                 = "/push";

        String API_LIGHTNING                    = "/api/switching";
        String API_STATUS_LAMP_ALL              = "/api/switching/lamp/all/status";
        String API_SWITCHON_LAMP                = "/api/switching/lamp/:identifierzone/:identifier/on";
        String API_SWITCHOFF_LAMP               = "/api/switching/lamp/:identifierzone/:identifier/off";
        String API_SWITCHON_LAMP_ALL            = "/api/switching/lamp/all/on";
        String API_SWITCHOFF_LAMP_ALL           = "/api/switching/lamp/all/off";

        String API_SWITCHON_CLIMATISEUR         = "/api/switching/climatiseur/:identifierzone/:identifier/on";
        String API_SWITCHOFF_CLIMATISEUR        = "/api/switching/climatiseur/:identifierzone/:identifier/off";
        String API_SWITCHON_CLIMATISEUR_ALL     = "/api/switching/climatiseur/all/on";
        String API_SWITCHOFF_CLIMATISEUR_ALL    = "/api/switching/climatiseur/all/off";

        String API_SWITCHUP_WINDOW              = "/api/switching/window/:identifierzone/:identifier/up";
        String API_SWITCHDOWN_WINDOW            = "/api/switching/window/:identifierzone/:identifier/down";
        String API_SWITCHUP_WINDOW_ALL          = "/api/switching/window/all/up";
        String API_SWITCHDOWN_WINDOW_ALL        = "/api/switching/window/all/down";


        // windows


    }

    public interface Views
    {
        String INDEX_PAGE            = "/app/www/index.html";
    }
}
