package com.chbinou.smarthouse.app.components.lightning;

import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.gpio.GpioPinDigitalOutput;
import com.pi4j.io.gpio.RaspiPin;

/**
 * Created by nxuser on 07/01/2017.
 */
public class LightingManager
{
    static final GpioController gpio = GpioFactory.getInstance();

    // provision gpio pin #01 & #03 as an output pins and blink
    static final GpioPinDigitalOutput led1 = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_01);

    public static boolean switchOnLamp(String identifier)
    {

        // code
        led1.blink(200);
        return true;
    }
}
