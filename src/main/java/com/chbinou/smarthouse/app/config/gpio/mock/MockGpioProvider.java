package com.chbinou.smarthouse.app.config.gpio.mock;

import com.pi4j.io.gpio.GpioProvider;
import com.pi4j.io.gpio.GpioProviderBase;
import com.pi4j.io.gpio.Pin;
import com.pi4j.io.gpio.PinState;

/**
 * Created by amine on 08/07/2017.
 */
public class MockGpioProvider extends GpioProviderBase implements GpioProvider
{

    public static final String NAME = "MockGpioProvider";

    @Override
    public String getName()
    {
        return NAME;
    }

    public void setMockState(Pin pin, PinState state)
    {
        getPinCache(pin).setState(state);
        dispatchPinDigitalStateChangeEvent(pin, state);
    }

    public void setMockAnalogValue(Pin pin, double value)
    {
        getPinCache(pin).setAnalogValue(value);
        dispatchPinAnalogValueChangeEvent(pin, value);
    }

}
