package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;
import com.pi4j.io.gpio.GpioPinDigitalOutput;

/**
 * Created by yassine on 07/01/2017.
 */
public class Window {
    @Expose
    private String identifier;
    @Expose
    private int mcpUp;
    @Expose
    private int mcpDown;
    @Expose
    private String addressUp;
    @Expose
    private String addressDown;

    private GpioPinDigitalOutput upPinInstanse;
    private GpioPinDigitalOutput downPinInstanse;

    public GpioPinDigitalOutput getUpPinInstanse() {
        return upPinInstanse;
    }

    public void setUpPinInstanse(GpioPinDigitalOutput upPinInstanse) {
        this.upPinInstanse = upPinInstanse;
    }

    public GpioPinDigitalOutput getDownPinInstanse() {
        return downPinInstanse;
    }

    public void setDownPinInstanse(GpioPinDigitalOutput downPinInstanse) {
        this.downPinInstanse = downPinInstanse;
    }



    public int getMcpUp() {
        return mcpUp;
    }

    public void setMcpUp(int mcpUp) {
        this.mcpUp = mcpUp;
    }

    public int getMcpDown() {
        return mcpDown;
    }

    public void setMcpDown(int mcpDown) {
        this.mcpDown = mcpDown;
    }

    public String getAddressUp() {
        return addressUp;
    }

    public void setAddressUp(String addressUp) {
        this.addressUp = addressUp;
    }

    public String getAddressDown() {
        return addressDown;
    }

    public void setAddressDown(String addressDown) {
        this.addressDown = addressDown;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
