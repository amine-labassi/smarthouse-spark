package com.chbinou.smarthouse.app.config;

import com.google.gson.Gson;

/**
 * Created by nxuser on 07/01/2017.
 */
public class GsonConfiguration
{
    private static Gson gson = new Gson();

    private GsonConfiguration() {
    }

    public static Gson getGsonInstance()
    {
        return gson;
    }
}
