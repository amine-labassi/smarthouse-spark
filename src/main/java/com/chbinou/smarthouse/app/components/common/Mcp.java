package com.chbinou.smarthouse.app.components.common;

/**
 * Created by yassine on 09/01/2017.
 */

import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;

import java.util.Objects;


public class Mcp {
    private MCP23017GpioProvider instance;
    private static int addresse;
    private int identifire;

    public int getIdentifire() {
        return identifire;
    }

    public void setIdentifire(int identifire) {
        this.identifire = identifire;
    }

    public static int getAddresse() {
        return addresse;
    }

    public static void setAddresse(int addresse) {
        Mcp.addresse = addresse;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    private int identifier;

    public MCP23017GpioProvider getInstance() {
        return instance;
    }

    public static void setInstance(MCP23017GpioProvider instance) {
        this.instance = instance;
    }





}
