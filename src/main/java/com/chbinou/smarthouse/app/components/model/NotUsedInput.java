package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;
import com.pi4j.io.gpio.GpioPinDigitalInput;

/**
 * Created by Yassine Chbinou on 03/07/2017.
 */
public class NotUsedInput {
    @Expose
    private int mcp;
    @Expose
    private String pin;

    private GpioPinDigitalInput inputPinInstance;

    public GpioPinDigitalInput getInputPinInstance() {
        return inputPinInstance;
    }

    public void setInputPinInstance(GpioPinDigitalInput inputPinInstance) {
        this.inputPinInstance = inputPinInstance;
    }

    public int getMcp() {
        return mcp;
    }

    public void setMcp(int mcp) {
        this.mcp = mcp;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
