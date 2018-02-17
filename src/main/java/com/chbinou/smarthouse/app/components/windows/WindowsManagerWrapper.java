package com.chbinou.smarthouse.app.components.windows;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Window;
import com.chbinou.smarthouse.app.components.model.Zone;
import com.chbinou.smarthouse.app.config.environment.Environment;
import com.pi4j.io.i2c.I2CFactory;

import java.io.IOException;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;
import static com.chbinou.smarthouse.app.components.lighting.LightingManager.switchOnLamp;
import static com.chbinou.smarthouse.app.components.windows.WindowsManager.*;

/**
 * Created by Yassine Chbinou on 07/08/2017.
 */
public class WindowsManagerWrapper {
    public static int switchUPWindowWrapper(String identifierzone, String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(Environment.isDevEnv())
        {
            System.out.println("window :" + identifier + ", zone :" + identifierzone + " : up");
            return 0;
        }
        else
        {
            return switchUPWindow(window);
        }
    }

    public static int switchDownWindowWrapper(String identifierzone, String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(Environment.isDevEnv())
        {
            System.out.println("window :" + identifier + ", zone :" + identifierzone + " : Down");
            return 0;
        }
        else
        {
            return switchDownWindow(window);
        }
    }

    public static int switchUPWindowAllWrapper() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        if(Environment.isDevEnv())
        {
            System.out.println("All window : Down");
            return 0;
        }
        else
        {
            return switchUPWindowAll();
        }
    }

    public static int switchDownWindowAllWrapper() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        if(Environment.isDevEnv())
        {
            System.out.println("All window : Down");
            return 0;
        }
        else
        {
            return switchDownWindowAll();
        }
    }
    public  static int positionWindowWrapper(String identifierzone, String identifier, String pos) throws InterruptedException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(Environment.isDevEnv())
        {
            System.out.println("window :" + identifier + ", zone :" + zone + "position :" + pos );
            return 0;
        }
        else
        {
            return positionWindow(window, pos);
        }
    }
}
