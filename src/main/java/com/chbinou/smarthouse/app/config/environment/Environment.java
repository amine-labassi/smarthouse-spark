package com.chbinou.smarthouse.app.config.environment;

import spark.utils.StringUtils;

/**
 * Created by amine on 08/07/2017.
 */
public class Environment
{
    public static boolean isDevEnv()
    {
        String envName = System.getProperty("env.name");
        return StringUtils.isNotBlank(envName) && "dev".equalsIgnoreCase(envName);
    }
}
