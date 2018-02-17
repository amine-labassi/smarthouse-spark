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
        return  WindowsManagerWrapper.switchUPWindowWrapper(request.params("identifierzone"), request.params("identifier"));
    };

    public static Route switchDownWindow  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return WindowsManagerWrapper.switchDownWindowWrapper(request.params("identifierzone"), request.params("identifier"));
    };

    public static Route switchUpWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return  WindowsManagerWrapper.switchUPWindowAllWrapper();
    };

    public static Route switchDownWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return WindowsManagerWrapper.switchDownWindowAllWrapper();
    };

    public static Route positionWindow = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return WindowsManagerWrapper.positionWindowWrapper(request.params("identifierzone"), request.params("identifier"), request.params("pos"));
    };

}
