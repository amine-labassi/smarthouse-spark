package com.chbinou.smarthouse.app.components.model;

import com.google.gson.annotations.Expose;

import java.util.List;

/**
 * Created by yassine on 01/03/2017.
 */
public class Zone
{
    @Expose
    private String id;
    @Expose
    private String title;
    @Expose
    private List<Lamp> lamps;
    @Expose
    private List<Window> windows;
    @Expose
    private List<AirConditionner> airConditionners;

    public List<Lamp> getLamps() {
        return lamps;
    }

    public void setLamps(List<Lamp> lamps) {
        this.lamps = lamps;
    }

    public List<Window> getWindows() {
        return windows;
    }

    public void setWindows(List<Window> windows) {
        this.windows = windows;
    }

    public List<AirConditionner> getAirConditionners() {
        return airConditionners;
    }

    public void setAirConditionners(List<AirConditionner> airConditionners) {
        this.airConditionners = airConditionners;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
