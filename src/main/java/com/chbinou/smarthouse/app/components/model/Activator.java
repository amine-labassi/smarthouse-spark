package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;
import com.pi4j.io.gpio.GpioPinDigitalOutput;

/**
 * Created by yassine on 19/06/2017.
 */
public class Activator {
    @Expose
    private int mcp;
    @Expose
    private String address;

    private GpioPinDigitalOutput outputPinInstance;

    public GpioPinDigitalOutput getOutputPinInstance() {
        return outputPinInstance;
    }

    public void setOutputPinInstance(GpioPinDigitalOutput outputPinInstance) {
        this.outputPinInstance = outputPinInstance;
    }

    public int getMcp() {
        return mcp;
    }

    public String getAddress() {
        return address;
    }
}
