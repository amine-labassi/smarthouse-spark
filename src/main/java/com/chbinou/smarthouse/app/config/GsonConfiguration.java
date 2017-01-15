package com.chbinou.smarthouse.app.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by nxuser on 07/01/2017.
 */
public class GsonConfiguration
{
    private static Gson gson;

    private GsonConfiguration() {
    }

    public static Gson getGsonInstance()
    {
        if(gson == null)
        {
            GsonBuilder builder = new GsonBuilder();
            builder.excludeFieldsWithoutExposeAnnotation();
            gson = builder.create();
        }

        return gson;
    }
}
