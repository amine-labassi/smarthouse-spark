package com.chbinou.smarthouse.app.components.lightning;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.lightning.model.Lamp;
import com.chbinou.smarthouse.app.components.lightning.model.Window;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import spark.utils.IOUtils;

import java.io.IOException;
import java.util.List;

/**
 * Created by yassine on 07/01/2017.
 */
public class LightingConfiguration
{


    public static LightingConfiguration instance;

    static
    {
        try
        {
            instance = GsonConfiguration.getGsonInstance().fromJson(
                    IOUtils.toString(SmartHouseApp.class.getClassLoader().getResourceAsStream("lightning_config.json")),
                    LightingConfiguration.class
            );
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }


    private List<Lamp> lamps;
    private List<Window> windows;

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
}
