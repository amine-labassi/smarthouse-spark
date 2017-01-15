package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;
import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;


public class Mcp
{
    //@Expose(deserialize = false, serialize = false)
    private MCP23017GpioProvider instance;
    @Expose
    private int address;

    public MCP23017GpioProvider getInstance() {
        return instance;
    }

    public void setInstance(MCP23017GpioProvider instance) {
        this.instance = instance;
    }

    public int getAddress() {
        return address;
    }

    public void setAddress(int address) {
        this.address = address;
    }
}
