package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.SmartHouseApp;

import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Zone;
import com.chbinou.smarthouse.app.components.model.Activator;
import com.pi4j.io.gpio.PinState;
import com.pi4j.io.i2c.I2CFactory;

import static com.chbinou.smarthouse.app.SmartHouseApp.gpio;
import static com.chbinou.smarthouse.app.SmartHouseApp.lightingConfigurationInstance;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
/**
 * Created by nxuser on 07/01/2017.
 */
public class LightingManager
{
    // provision gpio pin #01 & #03 as an output pins and blink
    public static boolean switchOnLamp(Lamp lamp) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == true)
        {
            TimeUnit.MILLISECONDS.sleep(50);
            lamp.getOutputPinInstance().pulse(100, PinState.LOW, true);
            TimeUnit.MILLISECONDS.sleep(50);
        }
        lamp.setStatus(gpio.isState(PinState.LOW,lamp.getInputPinInstance()));


        return true;
    }


    public static boolean  switchOffLamp(Lamp lamp) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {

        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance())==false)
        {
            TimeUnit.MILLISECONDS.sleep(50);
            lamp.getOutputPinInstance().pulse(100, PinState.LOW, true);
            TimeUnit.MILLISECONDS.sleep(50);
        }

        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));

        return true;
    }

    public static boolean  switchOnLampAll() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {


        for(Zone zone : lightingConfigurationInstance.getZones() ) {

            for (Lamp lamp : zone.getLamps()) {
                if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == true) {

                    TimeUnit.MILLISECONDS.sleep(50);
                    lamp.getOutputPinInstance().setState(false);
                    TimeUnit.MILLISECONDS.sleep(100);
                    lamp.getOutputPinInstance().setState(true);
                    TimeUnit.MILLISECONDS.sleep(50);
                }

            }
        }

        return true;
    }

    public static boolean  switchOffLampAll() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {


        for(Zone zone : lightingConfigurationInstance.getZones() ) {

        for (Lamp lamp : zone.getLamps())
        {

            if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == false) {
                TimeUnit.MILLISECONDS.sleep(50);
                lamp.getOutputPinInstance().setState(false);
                TimeUnit.MILLISECONDS.sleep(100);
                lamp.getOutputPinInstance().setState(true);
                TimeUnit.MILLISECONDS.sleep(50);
            }
        }
        }


        return true;
    }

    public static boolean getStatusAllLamps() throws InterruptedException {

        for(Zone zone : lightingConfigurationInstance.getZones() )
            for (Lamp lamp : zone.getLamps()) {
                lamp.setStatus(gpio.isState(PinState.LOW ,lamp.getInputPinInstance()));
            }

        return true;

    }

}
