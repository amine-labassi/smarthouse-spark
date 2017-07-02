package com.chbinou.smarthouse.app.config.schedule;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.lighting.LightingManager;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.chbinou.smarthouse.app.config.websocket.CheckStatusWebSocket;
import org.eclipse.jetty.util.StringUtil;
import org.eclipse.jetty.websocket.api.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.TimerTask;

/**
 * Created by amine on 02/07/2017.
 */
public class CheckStatusPeriodicTask extends TimerTask
{
    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void run()
    {
        boolean notifyClientApp = true;

        // compute all status
        try
        {
            LightingManager.getStatusAllLamps();
        }
        catch (InterruptedException ex)
        {
            logger.error("LightingManager.getStatusAllLamps fail to execute", ex);
            notifyClientApp = false;
        }

        if(notifyClientApp)
        {
            // send new status for all connected apps
            final String messageToSend = GsonConfiguration.getGsonInstance().toJson(SmartHouseApp.lightingConfigurationInstance.getZones());

            CheckStatusWebSocket.sessions.stream().forEach(session -> {
                try
                {
                    session.getRemote().sendString(messageToSend);
                }
                catch (IOException e)
                {
                    logger.error("Error send status message to apps",e);
                }
            });
        }

        // -Dsmarthouse.periodcheck.duration=10
        String durationProperty = System.getProperty("smarthouse.periodcheck.duration");

        int duration = 4;

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

        SmartHouseApp.timer.schedule(new CheckStatusPeriodicTask(), duration * 1000);
    }
}
