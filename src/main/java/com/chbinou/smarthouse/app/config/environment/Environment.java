package com.chbinou.smarthouse.app.config.environment;

import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.utils.StringUtils;

import java.net.URL;

/**
 * Created by amine on 08/07/2017.
 */
public class Environment
{
    protected static Logger logger = LoggerFactory.getLogger(Environment.class);

    public static boolean isDevEnv()
    {
        String envName = System.getProperty("env.name");
        return StringUtils.isNotBlank(envName) && "dev".equalsIgnoreCase(envName);
    }

    public static String keyStore()
    {
        String keyStoreProp = System.getProperty("keystore.file");
        keyStoreProp = StringUtils.isBlank(keyStoreProp) ? "keystores/Keystore.jks" : keyStoreProp;
        URL url = Environment.class.getClassLoader().getResource(keyStoreProp);

        if(url != null)
        {
            return url.getPath();
        }

        return keyStoreProp;
    }

    public static String keyStorePassword()
    {
        String keyStorePasswordProp = System.getProperty("keystore.password");
        return StringUtils.isBlank(keyStorePasswordProp) ? "azerty" : keyStorePasswordProp;
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

    public static int port()
    {
        String port = System.getProperty("server.port");
        return StringUtils.isBlank(port) ? 4504 : Integer.valueOf(port);
    }

    public static int period()
    {
        // -Dsmarthouse.periodcheck.duration=10
        String durationProperty = System.getProperty("smarthouse.periodcheck.duration");

        int duration = 3000;

        try
        {
            duration = Integer.valueOf(durationProperty);
        }
        catch (NumberFormatException ex)
        {
            if(StringUtil.isNotBlank(durationProperty))
            {
                logger.error("Property [smarthouse.periodcheck.duration=" + durationProperty + "] can't be parsed as number. default to 4sec.", ex);
            }
        }
        return duration;
    }
}
