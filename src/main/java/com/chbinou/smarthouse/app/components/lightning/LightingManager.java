package com.chbinou.smarthouse.app.components.lightning;

import com.chbinou.smarthouse.app.components.common.Provider;
import com.chbinou.smarthouse.app.components.lightning.model.Lamp;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.gpio.GpioPinDigitalOutput;
import com.pi4j.io.gpio.RaspiPin;

/**
 * Created by nxuser on 07/01/2017.
 */
public class LightingManager
{


    // provision gpio pin #01 & #03 as an output pins and blink


    public static boolean switchOnLamp(final String identifier)
    {
        final Lamp lamp = LightingConfiguration.instance.getLamps().stream().filter( o -> o.getIdentifier().equals(identifier)).findFirst().get();

        final Provider provider = LightingConfiguration.instance.getProviders().stream().filter(o -> o.getI2cAddress() == lamp.getI2cCommand()).findFirst().get();

        //provider.getInputPins()

        // code
        //led1.blink(200);
        return true;
    }
}
