package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Zone;
import com.chbinou.smarthouse.app.config.environment.Environment;
import com.pi4j.io.i2c.I2CFactory;

import java.io.IOException;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;
import static com.chbinou.smarthouse.app.components.lighting.LightingManager.*;

/**
 * Created by Yassine Chbinou on 06/08/2017.
 */
public class LightingManagerWrapper {

    public static boolean switchOnLampWrapper(String identifierzone, String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        Zone zone = lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Lamp lamp = zone.getLamps().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(Environment.isDevEnv())
        {
            System.out.println("lamp :" + identifier + ", zone :" + identifierzone + " : on");
            lamp.setStatus(true);
            return true ;
        }
        else
        {
            return switchOnLamp(lamp);
        }
    }

    public static boolean switchOffLampWrapper(String identifierzone, String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException
    {
        Zone zone = lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Lamp lamp = zone.getLamps().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(Environment.isDevEnv())
        {
            System.out.println("lamp :" + identifier + ", zone : " + identifierzone + " : off");
            lamp.setStatus(true);
            return true ;
        }
        else
        {
            return switchOffLamp(lamp);
        }
    }

    public static boolean getStatusAllLampsWrapper() throws InterruptedException {
        if(!Environment.isDevEnv())
        {
            return getStatusAllLamps();
        }
        else
        {
            return true;
        }
    }

    public static boolean switchOffLampAllWrapper() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException
    {
        if(Environment.isDevEnv())
        {
            System.out.println("all lamp : Off");
            for(Zone zone : lightingConfigurationInstance.getZones() ) {

                for (Lamp lamp : zone.getLamps())
                {
                    lamp.setStatus(false);
                }
            }
            return true ;
        }
        else
        {
            return switchOffLampAll();
        }
    }

    public static boolean switchOnLampAllWrapper() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException
    {
        if(Environment.isDevEnv())
        {
            System.out.println("all lamp : Off");
            for(Zone zone : lightingConfigurationInstance.getZones() ) {

                for (Lamp lamp : zone.getLamps())
                {
                    lamp.setStatus(true);
                }
            }
            return true ;
        }
        else
        {
            return switchOnLampAll();
        }
    }

}


