package com.chbinou.smarthouse.app.config;

/**
 * Created by nxuser on 07/01/2017.
 */
public class Constantes
{
    public interface Url
    {
        String ANY                              = "/*";
        String API_PUSH_WSOCKET                 = "/push";
        String PATH_API                         = "/api";

        String LOGIN                            = "/login";
        //Lamps
        String PATH_SWITCHING                   = "/switching";
        String PATH_LAMP                        = "/lamp";
        String API_STATUS_LAMP_ALL              = "/all/status";
        String API_SWITCHON_LAMP                = "/:identifierzone/:identifier/on";
        String API_SWITCHOFF_LAMP               = "/:identifierzone/:identifier/off";
        String API_SWITCHON_LAMP_ALL            = "/all/on";
        String API_SWITCHOFF_LAMP_ALL           = "/all/off";
        //climatiseurs
        String PATH_COOLER                      = "/climatiseur";
        String API_SWITCHON_CLIMATISEUR         = "/:identifierzone/:identifier/on";
        String API_SWITCHOFF_CLIMATISEUR        = "/:identifierzone/:identifier/off";
        String API_SWITCHON_CLIMATISEUR_ALL     = "/all/on";
        String API_SWITCHOFF_CLIMATISEUR_ALL    = "/all/off";
        //Windows
        String PATH_WINDOW                      = "/window";
        String API_SWITCHUP_WINDOW              = "/:identifierzone/:identifier/up";
        String API_SWITCHDOWN_WINDOW            = "/:identifierzone/:identifier/down";
        String API_SWITCHUP_WINDOW_ALL          = "/all/up";
        String API_SWITCHDOWN_WINDOW_ALL        = "/all/down";
        String API_POSITION_WINDOW              = "/:identifierzone/:identifier/:pos";
        String API_POSITION_WINDOW_ALL          = "/all/:pos";




    }
}
