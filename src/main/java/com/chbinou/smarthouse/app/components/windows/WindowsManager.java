package com.chbinou.smarthouse.app.components.windows;


import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Window;
import com.pi4j.io.gpio.PinState;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;

/**
 * Created by yassine on 11/01/2017.
 */
public class WindowsManager  extends Thread{

    public static boolean switchUPWindow(Window window) throws InterruptedException {
        window.getUpPinInstanse().setState(true);
        Thread.sleep(50000);
        window.getUpPinInstanse().setState(false);

        return true;
    }

    public static boolean switchDownWindow(Window window) throws InterruptedException {
        window.getDownPinInstanse().setState(true);
        Thread.sleep(50000);
        window.getDownPinInstanse().setState(false);

        return true;
    }

    public static boolean switchUPWindowAll() throws InterruptedException {
        for (Window window : lightingConfigurationInstance.getWindows())
            window.getUpPinInstanse().setState(true);
        Thread.sleep(50000);
        for (Window window : lightingConfigurationInstance.getWindows())
           window.getUpPinInstanse().setState(false);


        return true;
    }

    public static boolean switchDownWindowAll() throws InterruptedException {
        for (Window window : lightingConfigurationInstance.getWindows())
            window.getDownPinInstanse().setState(true);
        Thread.sleep(50000);
        for (Window window : lightingConfigurationInstance.getWindows())
            window.getDownPinInstanse().setState(false);


        return true;
    }


}
