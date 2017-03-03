package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Zone;
import com.pi4j.io.gpio.PinState;

import static com.chbinou.smarthouse.app.SmartHouseApp.gpio;
import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;

/**
 * Created by nxuser on 07/01/2017.
 */
public class LightingManager
{
    // provision gpio pin #01 & #03 as an output pins and blink

    public static boolean switchOnLamp(String identifierzone,String identifier) throws InterruptedException
    {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Lamp lamp = zone.getLamps().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();

        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == true)
        {
            lamp.getOutputPinInstance().pulse(300, PinState.HIGH);
        }
        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));
        return true;
    }

    public static boolean  switchOffLamp(String identifierzone,String identifier) throws InterruptedException
    {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Lamp lamp = zone.getLamps().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();

        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance())==false)
        {
            lamp.getOutputPinInstance().pulse(100, PinState.HIGH);
        }
        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));
        return true;
    }

    public static boolean  switchOnLampAll() throws InterruptedException
    {
        for(Zone zone : lightingConfigurationInstance.getZones() ) {
            for (Lamp lamp : zone.getLamps()) {
                if (gpio.isState(PinState.HIGH, lamp.getInputPinInstance()) == true) {
                    lamp.getOutputPinInstance().pulse(100, PinState.HIGH);
                }
            }
        }
        return true;
    }

    public static boolean  switchOffLampAll() throws InterruptedException
    {
        for(Zone zone : lightingConfigurationInstance.getZones() ) {
        for (Lamp lamp : zone.getLamps())
        {
            if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance())==false)
            {
                lamp.getOutputPinInstance().pulse(100, PinState.HIGH);
            }
        }}

        return true;
    }

    public static void getStatusAllLamps()
    {
        for(Zone zone : lightingConfigurationInstance.getZones() ) {
        for (Lamp lamp : zone.getLamps())
        {
            lamp.setStatus(gpio.isState(PinState.LOW ,lamp.getInputPinInstance()));

        }
    }}
}
