package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;

import java.util.List;

/**
 * Created by yassine on 07/01/2017.
 */
public class ElectronicInterfaceConfiguration
{

    @Expose
    private List<Lamp> lamps;
    @Expose
    private List<Mcp> mcps;
    @Expose
    private List<Window> windows;
    @Expose
    private List<AirConditionner> airConditionners;

    public List<AirConditionner> getAirConditionners() {
        return airConditionners;
    }

    public void setAirConditionners(List<AirConditionner> airConditionners) {
        this.airConditionners = airConditionners;
    }

    public List<Window> getWindows() {
        return windows;
    }

    public void setWindows(List<Window> windows) {
        this.windows = windows;
    }

    public List<Lamp> getLamps() {
        return lamps;
    }

    public void setLamps(List<Lamp> lamps) {
        this.lamps = lamps;
    }

    public List<Mcp> getMcps() {
        return mcps;
    }

    public void setMcps(List<Mcp> mcps) {
        this.mcps = mcps;
    }

}
