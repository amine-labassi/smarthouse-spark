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

    public static boolean switchUPWindow(String identifierzone,String identifier) throws InterruptedException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();

        window.getUpPinInstanse().pulse(50000, PinState.HIGH, false);


        return true;
    }

    public static boolean switchDownWindow(String identifierzone,String identifier) throws InterruptedException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Window window = zone.getWindows().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();

        window.getDownPinInstanse().pulse(50000, PinState.HIGH, false);


        return true;
    }

    public static boolean switchUPWindowAll() throws InterruptedException {
        for (Zone zone : lightingConfigurationInstance.getZones()){
        for (Window window : zone.getWindows()){
            window.getUpPinInstanse().pulse(50000, PinState.HIGH, false);
        }}


        return true;
    }

    public static boolean switchDownWindowAll() throws InterruptedException {
        for (Zone zone : lightingConfigurationInstance.getZones()){
        for (Window window : zone.getWindows()){
             window.getDownPinInstanse().pulse(50000, PinState.HIGH, false);
        }}


        return true;
    }


}
