package com.chbinou.smarthouse.app.components.windows;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Window;
import spark.Route;

/**
 * Created by yassine on 15/01/2017.
 */
public class WindowsController
{
    public static Route switchUPWindow  = (request, response) ->
    {
        response.header("Content-Type","application/json");
        Window window = SmartHouseApp.lightingConfigurationInstance.getWindows().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();
        WindowsManager.switchUPWindow(window);

        return true ;
    };

    public static Route switchDownWindow  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        Window window = SmartHouseApp.lightingConfigurationInstance.getWindows().stream().filter(o -> o.getIdentifier().equals("1")).findFirst().get();
        WindowsManager.switchDownWindow(window);

        return true ;
    };

    public static Route switchUpWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        WindowsManager.switchUPWindowAll();

        return true ;
    };

    public static Route switchDownWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        WindowsManager.switchDownWindowAll();

        return true ;
    };

}
