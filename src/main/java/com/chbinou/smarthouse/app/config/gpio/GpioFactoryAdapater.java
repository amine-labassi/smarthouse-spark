package com.chbinou.smarthouse.app.config.gpio;

import com.chbinou.smarthouse.app.config.environment.Environment;
import com.chbinou.smarthouse.app.config.gpio.mock.MockGpioFactory;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;

/**
 * Created by amine on 08/07/2017.
 */
public class GpioFactoryAdapater
{
    public static GpioController getInstance()
    {

        if(Environment.isDevEnv())
        {
            MockGpioFactory.getMockProvider();
            return MockGpioFactory.getInstance();
        }
        else
        {
            return GpioFactory.getInstance();
        }
    }
}
