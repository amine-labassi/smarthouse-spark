package com.chbinou.smarthouse.app.config.gpio.mock;

import com.pi4j.io.gpio.*;
import com.pi4j.io.gpio.event.PinListener;

/**
 * Created by amine on 08/07/2017.
 */
public class MockMCP23017GpioProvider implements GpioProvider
{
    public static final String NAME = "MockMCP23017GpioProvider";

    @Override
    public String getName()
    {
        return NAME;
    }

    @Override
    public boolean hasPin(Pin pin) {
        return false;
    }

    @Override
    public void export(Pin pin, PinMode mode, PinState defaultState) {

    }

    @Override
    public void export(Pin pin, PinMode mode) {

    }

    @Override
    public boolean isExported(Pin pin) {
        return false;
    }

    @Override
    public void unexport(Pin pin) {

    }

    @Override
    public void setMode(Pin pin, PinMode mode) {

    }

    @Override
    public PinMode getMode(Pin pin) {
        return null;
    }

    @Override
    public void setPullResistance(Pin pin, PinPullResistance resistance) {

    }

    @Override
    public PinPullResistance getPullResistance(Pin pin) {
        return null;
    }

    @Override
    public void setState(Pin pin, PinState state) {

    }

    @Override
    public PinState getState(Pin pin) {
        return null;
    }

    @Override
    public void setValue(Pin pin, double value) {

    }

    @Override
    public double getValue(Pin pin) {
        return 0;
    }

    @Override
    public void setPwm(Pin pin, int value) {

    }

    @Override
    public void setPwmRange(Pin pin, int range) {

    }

    @Override
    public int getPwm(Pin pin) {
        return 0;
    }

    @Override
    public void addListener(Pin pin, PinListener listener) {

    }

    @Override
    public void removeListener(Pin pin, PinListener listener) {

    }

    @Override
    public void removeAllListeners() {

    }

    @Override
    public void shutdown() {

    }

    @Override
    public boolean isShutdown() {
        return false;
    }
}
