package com.chbinou.smarthouse.app.components.model;

/**
 * Created by nxuser on 07/01/2017.
 */
import com.google.gson.annotations.Expose;
import com.pi4j.io.gpio.GpioPinDigitalInput;
import com.pi4j.io.gpio.GpioPinDigitalOutput;
import com.pi4j.io.gpio.PinState;

public class Lamp
{
    @Expose
    private String identifier;
    @Expose
    private boolean status;
    @Expose


    private int mcpInput;
    @Expose
    private int mcpOutput;
    @Expose
    private String addressInput;
    @Expose
    private String addressOutput;
    //@Expose(deserialize = false, serialize = false)
    private GpioPinDigitalOutput outputPinInstance;
    private GpioPinDigitalInput inputPinInstance;
    private PinState pinState;

    public PinState getPinState() {
        return pinState;
    }

    public void setPinState(PinState pinState) {
        this.pinState = pinState;
    }

    public GpioPinDigitalInput getInputPinInstance() {
        return inputPinInstance;
    }

    public void setInputPinInstance(GpioPinDigitalInput inputPinInstance) {
        this.inputPinInstance = inputPinInstance;
    }

    public GpioPinDigitalOutput getOutputPinInstance() {
        return outputPinInstance;
    }

    public void setOutputPinInstance(GpioPinDigitalOutput outputPinInstance) {this.outputPinInstance = outputPinInstance;}

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {this.identifier = identifier;}

    public int getMcpInput() {
        return mcpInput;
    }

    public void setMcpInput(int mcpInput) {
        this.mcpInput = mcpInput;
    }

    public int getMcpOutput() {
        return mcpOutput;
    }

    public void setMcpOutput(int mcpOutput) {
        this.mcpOutput = mcpOutput;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getAddressInput() {
        return addressInput;
    }

    public void setAddressInput(String addressInput) {
        this.addressInput = addressInput;
    }

    public String getAddressOutput() {
        return addressOutput;
    }

    public void setAddressOutput(String addressOutput) {
        this.addressOutput = addressOutput;
    }




}
