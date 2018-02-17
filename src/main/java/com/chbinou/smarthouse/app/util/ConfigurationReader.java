package com.chbinou.smarthouse.app.util;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.model.*;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.chbinou.smarthouse.app.config.environment.Environment;
import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;
import com.pi4j.gpio.extension.mcp.MCP23017Pin;
import com.pi4j.io.gpio.Pin;
import com.pi4j.io.gpio.PinPullResistance;
import com.pi4j.io.gpio.PinState;
import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CFactory;
import spark.utils.IOUtils;

import java.io.IOException;
import java.util.Arrays;

/**
 * Created by yassine on 10/01/2017.
 */
public class ConfigurationReader {
    public static ElectronicInterfaceConfiguration parseConfiguration() throws IOException {
        return GsonConfiguration.getGsonInstance().fromJson(
                IOUtils.toString(SmartHouseApp.class.getClassLoader().getResourceAsStream("lightning_config.json")),
                ElectronicInterfaceConfiguration.class
        );

    }

    public static void init() throws IOException, I2CFactory.UnsupportedBusNumberException {
        if(Environment.isDevEnv()){
            return;
        }
        for (Mcp mcp : SmartHouseApp.lightingConfigurationInstance.getMcps()) {
            mcp.setInstance(new MCP23017GpioProvider(I2CBus.BUS_1, mcp.getAddress()));
        }
        for (Zone zone : SmartHouseApp.lightingConfigurationInstance.getZones()) {

            for (Lamp lamp : zone.getLamps()) {
                Mcp mcp = findMcp(lamp.getMcpOutput());
                Pin pin = findPin(lamp.getAddressOutput());
                lamp.setOutputPinInstance(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(), pin, PinState.HIGH));
                lamp.getOutputPinInstance().setState(true);

                mcp = findMcp(lamp.getMcpInput());
                pin = findPin(lamp.getAddressInput());
                lamp.setInputPinInstance(SmartHouseApp.gpio.provisionDigitalInputPin(mcp.getInstance(), pin));
            }
            for (Window window : zone.getWindows()) {
                Mcp mcp = findMcp(window.getMcpUp());
                Pin pin = findPin(window.getAddressUp());
                window.setUpPinInstanse(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(), pin, PinState.HIGH));
                window.getUpPinInstanse().setState(true);

                mcp = findMcp(window.getMcpDown());
                pin = findPin(window.getAddressDown());
                window.setDownPinInstanse(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(), pin, PinState.HIGH));
                window.getDownPinInstanse().setState(true);
            }

            for (AirConditionner airConditionner : zone.getAirConditionners()) {
                Mcp mcp = findMcp(airConditionner.getMcpOutput());
                Pin pin = findPin(airConditionner.getAddressOutput());
                airConditionner.setOutputPinInstance(SmartHouseApp.gpio.provisionDigitalOutputPin(mcp.getInstance(), pin, PinState.HIGH));
                airConditionner.getOutputPinInstance().setState(true);

                mcp = findMcp(airConditionner.getMcpInput());
                pin = findPin(airConditionner.getAddressInput());
                airConditionner.setInputPinInstance(SmartHouseApp.gpio.provisionDigitalInputPin(mcp.getInstance(), pin));
            }
            for (Lamp lamp : zone.getLamps()) {
                lamp.setStatus(SmartHouseApp.gpio.isState(PinState.HIGH, lamp.getInputPinInstance()));
            }
            for (AirConditionner airConditionner : zone.getAirConditionners()) {
                airConditionner.setStatus(SmartHouseApp.gpio.isState(PinState.HIGH, airConditionner.getInputPinInstance()));
            }
        }

        /*for(NotUsedInput notUsedInput : SmartHouseApp.lightingConfigurationInstance.getNotUsedInputs()){
        Mcp mcp = findMcp(notUsedInput.getMcp());
        Pin pin = findPin(notUsedInput.getPin());
        SmartHouseApp.gpio.provisionDigitalInputPin(mcp.getInstance(), pin);
        }*/

        /*for(NotUsedOutput notUsedOutput : SmartHouseApp.lightingConfigurationInstance.getNotUsedOutputs())
       {
            Mcp mcp = findMcp(notUsedOutput.getMcp());
            Pin pin = findPin(notUsedOutput.getPin());
            SmartHouseApp.gpio.provisionDigitalInputPin(mcp.getInstance(), pin);
        }*/

        for (Zone zone : SmartHouseApp.lightingConfigurationInstance.getZones()) {

            for (Lamp lamp : zone.getLamps()) {
                Mcp mcp = findMcp(lamp.getMcpOutput());
                Pin pin = findPin(lamp.getAddressOutput());
                lamp.getOutputPinInstance().setState(true);
            }
            for (Window window : zone.getWindows()) {
                Mcp mcp = findMcp(window.getMcpUp());
                Pin pin = findPin(window.getAddressUp());
                window.getUpPinInstanse().setState(true);

                mcp = findMcp(window.getMcpDown());
                pin = findPin(window.getAddressDown());
                window.getDownPinInstanse().setState(true);
            }

            for (AirConditionner airConditionner : zone.getAirConditionners()) {
                Mcp mcp = findMcp(airConditionner.getMcpOutput());
                Pin pin = findPin(airConditionner.getAddressOutput());
                airConditionner.getOutputPinInstance().setState(true);
            }
        }


    }

    private static Pin findPin(String pinAddress) {
        return Arrays.stream(MCP23017Pin.ALL).filter(o -> o.getName().equals(pinAddress)).findFirst().get();
    }

    private static Mcp findMcp(int mcpAddress) {
        return SmartHouseApp.lightingConfigurationInstance.getMcps().stream().filter(o -> o.getAddress() == mcpAddress).findFirst().get();
    }
}
