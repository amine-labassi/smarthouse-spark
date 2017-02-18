package com.chbinou.smarthouse.app.components.windows;


import com.chbinou.smarthouse.app.components.model.Window;
import com.pi4j.io.gpio.PinState;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;

/**
 * Created by yassine on 11/01/2017.
 */
public class WindowsManager  {

    public static boolean switchUPWindow(Window window) throws InterruptedException {
      //  window.getUpPinInstanse().pulse(50000, PinState.HIGH);


        return true;
    }

    public static boolean switchDownWindow(Window window) throws InterruptedException {
    //    window.getDownPinInstanse().pulse(50000, PinState.HIGH);


        return true;
    }

    public static boolean switchUPWindowAll() throws InterruptedException {
        for (Window window : lightingConfigurationInstance.getWindows()){
         //   window.getUpPinInstanse().pulse(50000, PinState.HIGH);
        }


        return true;
    }

    public static boolean switchDownWindowAll() throws InterruptedException {
        for (Window window : lightingConfigurationInstance.getWindows()){
           // window.getDownPinInstanse().pulse(50000, PinState.HIGH);
        }


        return true;
    }


}
