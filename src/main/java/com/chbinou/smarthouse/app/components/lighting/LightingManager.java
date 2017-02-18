package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.components.model.Lamp;
import com.pi4j.io.gpio.PinState;

import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;
import static com.chbinou.smarthouse.app.SmartHouseApp.gpio;

/**
 * Created by nxuser on 07/01/2017.
 */
public class LightingManager
{
    // provision gpio pin #01 & #03 as an output pins and blink

    public static boolean switchOnLamp(final Lamp lamp) throws InterruptedException
    {
       // if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == true)
       // {
            lamp.getOutputPinInstance().pulse(300, PinState.HIGH);
        //}
        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));
        return true;
    }

    public static boolean  switchOffLamp(final Lamp lamp) throws InterruptedException
    {
        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance())==false)
        {
            lamp.getOutputPinInstance().pulse(100, PinState.HIGH);
        }
        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));
        return true;
    }

    public static boolean  switchOnLampAll() throws InterruptedException
    {
        for (Lamp lamp : lightingConfigurationInstance.getLamps())
        {
            if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == true)
            {
                lamp.getOutputPinInstance().pulse(100, PinState.HIGH);
            }
        }

        return true;
    }

    public static boolean  switchOffLampAll() throws InterruptedException
    {
        for (Lamp lamp : lightingConfigurationInstance.getLamps())
        {
            if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance())==false)
            {
                lamp.getOutputPinInstance().pulse(100, PinState.HIGH);
            }
        }

        return true;
    }

    public static void getStatusAllLamps()
    {

        for (Lamp lamp : lightingConfigurationInstance.getLamps())
        {
            lamp.setStatus(gpio.isState(PinState.HIGH ,lamp.getInputPinInstance()));
        }
    }
}
