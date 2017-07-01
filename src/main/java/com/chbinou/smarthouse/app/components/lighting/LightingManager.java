package com.chbinou.smarthouse.app.components.lighting;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.util.SetupDevices;
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
    static Activator activator = SmartHouseApp.lightingConfigurationInstance.getActivator();
    public static boolean switchOnLamp(String identifierzone,String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Lamp lamp = zone.getLamps().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
       // SetupDevices.ActivingDevices();
        activator.getOutputPinInstance().setState(false);
        TimeUnit.MILLISECONDS.sleep(100);
        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance()) == true)
        {
            TimeUnit.MILLISECONDS.sleep(50);
            lamp.getOutputPinInstance().pulse(100, PinState.LOW, true);
            TimeUnit.MILLISECONDS.sleep(50);
        }
        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));
        activator.getOutputPinInstance().setState(true);

        return true;
    }


    public static boolean  switchOffLamp(String identifierzone,String identifier) throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        Zone zone = SmartHouseApp.lightingConfigurationInstance.getZones().stream().filter(o -> o.getId().equals(identifierzone)).findFirst().get();
        Lamp lamp = zone.getLamps().stream().filter(o -> o.getIdentifier().equals(identifier)).findFirst().get();
        //SetupDevices.ActivingDevices();
        activator.getOutputPinInstance().setState(false);
        TimeUnit.MILLISECONDS.sleep(100);
        if (gpio.isState(PinState.HIGH,lamp.getInputPinInstance())==false)
        {
            TimeUnit.MILLISECONDS.sleep(50);
            lamp.getOutputPinInstance().pulse(100, PinState.LOW, true);
            TimeUnit.MILLISECONDS.sleep(50);
        }
        activator.getOutputPinInstance().setState(true);
        lamp.setStatus(gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));

        return true;
    }

    public static boolean  switchOnLampAll() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
       // SetupDevices.ActivingDevices();
        activator.getOutputPinInstance().setState(false);
        TimeUnit.MILLISECONDS.sleep(100);
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
        activator.getOutputPinInstance().setState(true);
        return true;
    }

    public static boolean  switchOffLampAll() throws InterruptedException, IOException, I2CFactory.UnsupportedBusNumberException {
        //SetupDevices.ActivingDevices();
        activator.getOutputPinInstance().setState(false);
        TimeUnit.MILLISECONDS.sleep(100);
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
        activator.getOutputPinInstance().setState(true);

        return true;
    }

    public static void getStatusAllLamps() throws InterruptedException {
        activator.getOutputPinInstance().setState(false);
        TimeUnit.MILLISECONDS.sleep(100);
        for(Zone zone : lightingConfigurationInstance.getZones() )
            for (Lamp lamp : zone.getLamps()) {
                lamp.setStatus(gpio.isState(PinState.HIGH ,lamp.getInputPinInstance()));
            }
        activator.getOutputPinInstance().setState(true);
    }

}
