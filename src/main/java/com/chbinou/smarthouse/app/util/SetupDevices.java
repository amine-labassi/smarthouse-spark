package com.chbinou.smarthouse.app.util;

/**
 * Created by yassine on 19/06/2017.
 */

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Mcp;
import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CDevice;
import com.pi4j.io.i2c.I2CFactory;
import com.pi4j.io.i2c.I2CFactory.UnsupportedBusNumberException;
import java.io.IOException;


public class SetupDevices {


   public static byte porta = 0x00;
   public static byte portb = 0x01;


    public SetupDevices() throws IOException, UnsupportedBusNumberException {
        I2CFactory.getInstance(I2CBus.BUS_1).getDevice(23);
    }


    public static void ActivingDevices(I2CBus bus) throws IOException, UnsupportedBusNumberException {

       for (Mcp mcp : SmartHouseApp.lightingConfigurationInstance.getMcps())
       {
           I2CDevice device = I2CFactory.getInstance(I2CBus.BUS_1).getDevice(mcp.getAddress());
           device.write(porta, (byte) mcp.getPorta());
           device.write(portb, (byte) mcp.getPortb());

       }

   }

   public static void SetValuesToLamp(Lamp lamp){





   }






}
