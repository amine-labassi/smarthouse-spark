package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;

import java.util.List;

/**
 * Created by yassine on 07/01/2017.
 */
public class ElectronicInterfaceConfiguration
{
    @Expose
    private List<Zone> zones;

    @Expose
    private List<Mcp> mcps;

    @Expose
    private List<NotUsedInput> notUsedInputs;

    @Expose
    private List<NotUsedOutput> notUsedOutputs;

    public List<NotUsedInput> getNotUsedInputs() {
        return notUsedInputs;
    }

    public void setNotUsedInputs(List<NotUsedInput> notUsedInputs) {
        this.notUsedInputs = notUsedInputs;
    }

    public List<NotUsedOutput> getNotUsedOutputs() {
        return notUsedOutputs;
    }

    public void setNotUsedOutputs(List<NotUsedOutput> notUsedOutputs) {
        this.notUsedOutputs = notUsedOutputs;
    }

    public void setActivator(Activator activator) {
        this.activator = activator;
    }

    @Expose
    private Activator activator;

    public Activator getActivator() {
        return activator;
    }

    public List<Zone> getZones() {
        return zones;
    }

    public void setZones(List<Zone> zones) {
        this.zones = zones;
    }

    public List<Mcp> getMcps() {
        return mcps;
    }

    public void setMcps(List<Mcp> mcps) {
        this.mcps = mcps;
    }

}
