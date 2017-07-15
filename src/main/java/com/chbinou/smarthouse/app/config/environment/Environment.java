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

    public static String keyStore()
    {
        String keyStoreProp = System.getProperty("keystore.file");
        keyStoreProp = StringUtils.isBlank(keyStoreProp) ? "keystores/keystore.jks" : keyStoreProp;
        return Environment.class.getClassLoader().getResource(keyStoreProp).getPath();
    }

    public static String keyStorePassword()
    {
        String keyStorePasswordProp = System.getProperty("keystore.password");
        return StringUtils.isBlank(keyStorePasswordProp) ? "azertyuiop" : keyStorePasswordProp;
    }

    public static String trustStore()
    {
        String trustStoreProp = System.getProperty("truststore.file");
        trustStoreProp = StringUtils.isBlank(trustStoreProp) ? null : trustStoreProp;
        return trustStoreProp == null ? null : Environment.class.getClassLoader().getResource(trustStoreProp).getPath();
    }

    public static String trustStorePassword()
    {
        String trustStorePasswordProp = System.getProperty("truststore.password");
        return StringUtils.isBlank(trustStorePasswordProp) ? null : trustStorePasswordProp;
    }

    public static boolean isSslTwoWay()
    {
        String sslTwoWay = System.getProperty("ssl.twoway");
        boolean isSslTwoWay = false;
        try
        {
            isSslTwoWay = Boolean.valueOf(sslTwoWay);
        }
        catch (Exception ex)
        {
            isSslTwoWay = false;
        }
        return isSslTwoWay;
    }
}
