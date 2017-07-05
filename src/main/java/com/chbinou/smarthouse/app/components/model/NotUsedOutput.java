package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;

/**
 * Created by Yassine Chbinou on 03/07/2017.
 */
public class NotUsedOutput {
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

    @Expose

    private int mcp;
    @Expose
    private String pin;
}
