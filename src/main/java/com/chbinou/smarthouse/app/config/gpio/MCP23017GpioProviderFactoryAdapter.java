package com.chbinou.smarthouse.app.config.gpio;

import com.chbinou.smarthouse.app.config.environment.Environment;
import com.chbinou.smarthouse.app.config.gpio.mock.MockMCP23017GpioProvider;
import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;
import com.pi4j.io.gpio.GpioProvider;
import com.pi4j.io.i2c.I2CFactory;

import java.io.IOException;

/**
 * Created by amine on 08/07/2017.
 */
public class MCP23017GpioProviderFactoryAdapter
{
    public static GpioProvider getInstance(int busNumber, int address) throws IOException, I2CFactory.UnsupportedBusNumberException
    {

        if(Environment.isDevEnv())
        {
            return new MockMCP23017GpioProvider();
        }
        else
        {
            return new MCP23017GpioProvider(busNumber, address);
        }
    }
}
