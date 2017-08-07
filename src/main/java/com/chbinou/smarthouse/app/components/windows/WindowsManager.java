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

    public static int switchUPWindow(Window window) throws InterruptedException {
        int returnedValus = 0;
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

    public static int switchDownWindow(Window window) throws InterruptedException {
        int returnedValus = 0;
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

    public static int positionWindow(Window window, String pos)
    {
        int returnedValus = 0;

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
