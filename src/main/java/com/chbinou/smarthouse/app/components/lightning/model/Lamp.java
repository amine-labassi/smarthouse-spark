package com.chbinou.smarthouse.app.components.lightning.model;

/**
 * Created by nxuser on 07/01/2017.
 */

import com.chbinou.smarthouse.app.components.common.Provider;

import java.util.List;

public class Lamp
{
    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Provider> getProviders() {
        return Providers;
    }

    public void setProviders(List<Provider> providers) {
        Providers = providers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMcpInput() {
        return mcpInput;
    }

    public void setMcpInput(String mcpInput) {
        this.mcpInput = mcpInput;
    }

    public String getMcpOutput() {
        return mcpOutput;
    }

    public void setMcpOutput(String mcpOutput) {
        this.mcpOutput = mcpOutput;
    }

    public String getAddressInput() {
        return addressInput;
    }

    public void setAddressInput(String addressInput) {
        this.addressInput = addressInput;
    }

    public String getAddreeOutput() {
        return addreeOutput;
    }

    public void setAddreeOutput(String addreeOutput) {
        this.addreeOutput = addreeOutput;
    }

    private int identifier;
    private boolean status;
    private List<Provider> Providers;
    private String description;
    private String mcpInput;
    private String mcpOutput;
    private String addressInput;
    private String addreeOutput;


}
