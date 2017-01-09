package com.chbinou.smarthouse.app.components.common;

import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;

import java.util.List;

/**
 * Created by yassine on 08/01/2017.
 */
public class Provider
{
    private int bus;
    private int i2cAddress;
    private List<Pin> inputPins;
    private MCP23017GpioProvider instance;

    public int getBus() {
        return bus;
    }

    public void setBus(int bus) {
        this.bus = bus;
    }

    public int getI2cAddress() {
        return i2cAddress;
    }

    public void setI2cAddress(int i2cAddress) {
        this.i2cAddress = i2cAddress;
    }

    public List<Pin> getInputPins() {
        return inputPins;
    }

    public void setInputPins(List<Pin> inputPins) {
        this.inputPins = inputPins;
    }

    public MCP23017GpioProvider getInstance() {
        return instance;
    }

    public void setInstance(MCP23017GpioProvider instance) {
        this.instance = instance;
    }
}
