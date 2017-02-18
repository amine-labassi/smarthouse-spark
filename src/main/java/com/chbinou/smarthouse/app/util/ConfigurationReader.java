package com.chbinou.smarthouse.app.util;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.Mcp;
import com.chbinou.smarthouse.app.components.model.ElectronicInterfaceConfiguration;
import com.chbinou.smarthouse.app.components.model.Lamp;
import com.chbinou.smarthouse.app.components.model.Window;
import com.chbinou.smarthouse.app.components.model.AirConditionner;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;
import com.pi4j.gpio.extension.mcp.MCP23017Pin;
import com.pi4j.io.gpio.Pin;
import com.pi4j.io.gpio.PinState;
import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CFactory;
import spark.utils.IOUtils;

import java.io.IOException;
import java.util.Arrays;

/**
 * Created by yassine on 10/01/2017.
 */
public class ConfigurationReader
{
    public static ElectronicInterfaceConfiguration parseConfiguration() throws IOException
    {
        return GsonConfiguration.getGsonInstance().fromJson(
                IOUtils.toString(SmartHouseApp.class.getClassLoader().getResourceAsStream("lightning_config.json")),
                ElectronicInterfaceConfiguration.class
        );

    }

    public static void  init() throws IOException, I2CFactory.UnsupportedBusNumberException
    {
        for (Mcp mcp : SmartHouseApp.lightingConfigurationInstance.getMcps())
        {
            mcp.setInstance(new MCP23017GpioProvider(I2CBus.BUS_1, mcp.getAddress()));
        }

        for(Lamp lamp : SmartHouseApp.lightingConfigurationInstance.getLamps())
        {
            Mcp mcp = findMcp(lamp.getMcpOutput());
            Pin pin = findPin(lamp.getAddressOutput());
            lamp.setOutputPinInstance(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(),pin));

            mcp = findMcp(lamp.getMcpInput());
            pin = findPin(lamp.getAddressInput());
            lamp.setInputPinInstance(SmartHouseApp.gpio.provisionDigitalInputPin(mcp.getInstance(),pin));

            // status
        }
        for (Window window : SmartHouseApp.lightingConfigurationInstance.getWindows())
        {
          Mcp mcp =findMcp(window.getMcpUp());
          Pin pin =findPin(window.getAddressUp());
          window.setUpPinInstanse(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(),pin));

          mcp =findMcp(window.getMcpDown());
          pin =findPin(window.getAddressDown());
          window.setDownPinInstanse(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(),pin));
        }

        for(AirConditionner airConditionner : SmartHouseApp.lightingConfigurationInstance.getAirConditionners())
        {
            Mcp mcp = findMcp(airConditionner.getMcpOutput());
            Pin pin = findPin(airConditionner.getAddressOutput());
            airConditionner.setOutputPinInstance(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(),pin));

            mcp = findMcp(airConditionner.getMcpInput());
            pin = findPin(airConditionner.getAddressInput());
            airConditionner.setInputPinInstance(SmartHouseApp.gpio.provisionDigitalInputPin(mcp.getInstance(),pin));
        }
        for(Lamp lamp : SmartHouseApp.lightingConfigurationInstance.getLamps())
        {
            lamp.setStatus(SmartHouseApp.gpio.isState(PinState.HIGH,lamp.getInputPinInstance()));
        }
        for(AirConditionner airConditionner : SmartHouseApp.lightingConfigurationInstance.getAirConditionners())
        {
            airConditionner.setStatus(SmartHouseApp.gpio.isState(PinState.HIGH, airConditionner.getInputPinInstance()));
        }

}

    private static Pin findPin(String pinAddress)
    {
        return Arrays.stream(MCP23017Pin.ALL).filter(o -> o.getName().equals(pinAddress)).findFirst().get();
    }

    private static Mcp findMcp(int mcpAddress)
    {
        return SmartHouseApp.lightingConfigurationInstance.getMcps().stream().filter(o -> o.getAddress() == mcpAddress).findFirst().get();
    }
}
