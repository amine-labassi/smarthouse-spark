package com.chbinou.smarthouse.app.components.airconditionner;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.AirConditionner;
import com.chbinou.smarthouse.app.components.model.Zone;
import com.chbinou.smarthouse.app.config.environment.Environment;
import com.pi4j.io.i2c.I2CFactory;

import java.io.IOException;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;
import static com.chbinou.smarthouse.app.components.airconditionner.AirConditionnerManager.*;

/**
 * Created by Yassine Chbinou on 17/02/2018.
 */
public class AirConditionnerManagerWrapper {
    public static boolean switchOnClimatiseurWrapper(String identifierzone,String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {

        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        AirConditionner airConditionner = zone.getAirConditionners().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();

        if(Environment.isDevEnv())
        {
            System.out.println("airConditionner :" + identifier + ", zone :" + identifierzone + " : on");
            airConditionner.setStatus(true);
            return true ;
        }
        else
        {
            return switchOnClimatiseur(airConditionner);
        }
    }

    public static boolean switchOffClimatiseurWrapper(String identifierzone,String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException
    {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        AirConditionner airConditionner = zone.getAirConditionners().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(Environment.isDevEnv())
        {
            System.out.println("airConditionner :" + identifier + ", zone : " + identifierzone + " : off");
            airConditionner.setStatus(true);
            return true ;
        }
        else
        {
            return switchOffClimatiseur(airConditionner);
        }
    }


    public static boolean switchOffClimatiseurAllWrapper() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException
    {
        if(Environment.isDevEnv())
        {
            System.out.println("all lamp : Off");
            for(Zone zone : lightingConfigurationInstance.getZones() ) {

                for (AirConditionner airConditionner : zone.getAirConditionners())
                {
                    airConditionner.setStatus(false);
                }
            }
            return true ;
        }
        else
        {
            return switchOffClimatiseurAll();
        }
    }

    public static boolean switchOnClimatiseurAllWrapper() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException
    {
        if(Environment.isDevEnv())
        {
            System.out.println("all lamp : Off");
            for(Zone zone : lightingConfigurationInstance.getZones() ) {

                for (AirConditionner airConditionner : zone.getAirConditionners())
                {
                    airConditionner.setStatus(true);
                }
            }
            return true ;
        }
        else
        {
            return switchOnClimatiseurAll();
        }
    }

}
