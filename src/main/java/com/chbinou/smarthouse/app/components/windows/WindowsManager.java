package com.chbinou.smarthouse.app.components.windows;


import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Window;
import com.chbinou.smarthouse.app.components.model.Zone;
import com.pi4j.io.gpio.PinState;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;

/**
 * Created by yassine on 11/01/2017.
 */
public class WindowsManager  {

    public static int switchUPWindow(String identifierzone,String identifier) throws InterruptedException {
        int returnedValus = 0;
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(window.getUpPinInstanse().isHigh() == true && window.getDownPinInstanse().isHigh() == true)
        {
            window.getUpPinInstanse().pulse(window.getUpTime(), PinState.LOW, false);
            returnedValus = 0;
        }
        else if (window.getUpPinInstanse().isHigh() == false)
        {
            returnedValus = 1;
        }
        else if (window.getDownPinInstanse().isHigh() == false)
        {
            returnedValus = 2;
        }

        return returnedValus;
    }

    public static int switchDownWindow(String identifierzone,String identifier) throws InterruptedException {
        int returnedValus = 0;
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        if(window.getUpPinInstanse().isHigh() == true && window.getDownPinInstanse().isHigh() == true)
        {
            window.getDownPinInstanse().pulse(window.getDownTime(), PinState.LOW, false);
            returnedValus = 0;
        }
        else if (window.getUpPinInstanse().isHigh() == false)
        {
            returnedValus = 1;
        }
        else if (window.getDownPinInstanse().isHigh() == false)
        {
            returnedValus = 2;
        }


        return returnedValus;
    }

    public static int switchUPWindowAll() throws InterruptedException {

        int returnedValus = 0 ;
        for (Zone zone : lightingConfigurationInstance.getZones())
        {
            for (Window window : zone.getWindows()) {
                if (window.getUpPinInstanse().isHigh() == true) {
                    returnedValus = 1;
                } else if (window.getDownPinInstanse().isHigh() == true) {
                    returnedValus = 2;
                }
            }
        }
        if(returnedValus ==0)
        {
        for (Zone zone : lightingConfigurationInstance.getZones())
        {
         for (Window window : zone.getWindows())
         {
            if(window.getUpPinInstanse().isHigh() == true || window.getDownPinInstanse().isHigh() == true)
            {
                window.getUpPinInstanse().pulse(window.getUpTime(), PinState.LOW, false);
                returnedValus = 0;
            }
            else if (window.getUpPinInstanse().isHigh() == true)
            {
                returnedValus = 1;
            }
            else if (window.getDownPinInstanse().isHigh() == true)
            {
                returnedValus = 2;
            }
         }
        }
        }


        return returnedValus;
    }

    public static int switchDownWindowAll() throws InterruptedException {
        int returnedValus = 0 ;
        for (Zone zone : lightingConfigurationInstance.getZones())
        {
            for (Window window : zone.getWindows()) {
                if (window.getUpPinInstanse().isHigh() == true) {
                    returnedValus = 1;
                } else if (window.getDownPinInstanse().isHigh() == true) {
                    returnedValus = 2;
                }
            }
        }
        if(returnedValus ==0)
        {
            for (Zone zone : lightingConfigurationInstance.getZones())
            {
                for (Window window : zone.getWindows())
                {
                    if(window.getUpPinInstanse().isHigh() == true || window.getDownPinInstanse().isHigh() == true)
                    {
                        window.getDownPinInstanse().pulse(window.getDownTime(), PinState.LOW, false);
                        returnedValus = 0;
                    }
                    else if (window.getUpPinInstanse().isHigh() == true)
                    {
                        returnedValus = 1;
                    }
                    else if (window.getDownPinInstanse().isHigh() == true)
                    {
                        returnedValus = 2;
                    }
                }
            }
        }


        return returnedValus;
    }

    public static int positionWindow(String identifierzone, String identifier, String pos)
    {
        int returnedValus = 0;
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        int value = (window.getUpTime()*Integer.parseInt(pos))/100;
        if(window.getUpPinInstanse().isHigh() == true && window.getDownPinInstanse().isHigh() == true)
        {
            window.getDownPinInstanse().pulse(window.getDownTime(), PinState.LOW, true);
            window.getUpPinInstanse().pulse(value, PinState.LOW, false);
            returnedValus = 0;
        }
        else if (window.getUpPinInstanse().isHigh() == false)
        {
            returnedValus = 1;
        }
        else if (window.getDownPinInstanse().isHigh() == false)
        {
            returnedValus = 2;
        }
        return  returnedValus;
    }



}
