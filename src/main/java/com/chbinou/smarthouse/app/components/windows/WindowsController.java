package com.chbinou.smarthouse.app.components.windows;

import spark.Route;

/**
 * Created by yassine on 15/01/2017.
 */
public class WindowsController
{
    public static Route switchUPWindow  = (request, response) ->
    {
        response.header("Content-Type","application/json");


        return  WindowsManager.switchUPWindow(request.params("identifierzone"), request.params("identifier"));

    };

    public static Route switchDownWindow  = (request,  response) ->
    {
        response.header("Content-Type","application/json");

        return WindowsManager.switchDownWindow(request.params("identifierzone"), request.params("identifier"));
    };

    public static Route switchUpWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return  WindowsManager.switchUPWindowAll();
    };

    public static Route switchDownWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        WindowsManager.switchDownWindowAll();

        return WindowsManager.switchDownWindowAll();
    };

}
