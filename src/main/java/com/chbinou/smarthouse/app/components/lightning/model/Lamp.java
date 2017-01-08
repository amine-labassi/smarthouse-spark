package com.chbinou.smarthouse.app.components.lightning.model;

/**
 * Created by nxuser on 07/01/2017.
 */
public class Lamp
{
    private String identifier;
    private boolean status;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
