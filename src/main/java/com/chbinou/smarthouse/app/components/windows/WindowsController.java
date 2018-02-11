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
        return  WindowsManagerWrapper.mockSwitchUPWindow(request.params("identifierzone"), request.params("identifier"));
    };

    public static Route switchDownWindow  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return WindowsManagerWrapper.mockSwitchDownWindow(request.params("identifierzone"), request.params("identifier"));
    };

    public static Route switchUpWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return  WindowsManagerWrapper.mockSwitchUPWindowAll();
    };

    public static Route switchDownWindowAll  = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return WindowsManagerWrapper.mockSwitchDownWindowAll();
    };

    public static Route positionWindow = (request,  response) ->
    {
        response.header("Content-Type","application/json");
        return WindowsManagerWrapper.mockPositionWindow(request.params("identifierzone"), request.params("identifier"), request.params("pos"));
    };

}
