package com.chbinou.smarthouse.app.config.gpio.mock;

import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.impl.GpioControllerImpl;

/**
 * Created by amine on 08/07/2017.
 */
public class MockGpioFactory
{
    private static MockGpioProvider provider = null;

    private MockGpioFactory() {
    }

    public static GpioController getInstance() {
        // return a new instance of the GPIO controller
        return new GpioControllerImpl(getMockProvider());
    }


    public static MockGpioProvider getMockProvider()
    {
        if (provider == null) {
            provider = new MockGpioProvider();
        }
        return provider;
    }
}
