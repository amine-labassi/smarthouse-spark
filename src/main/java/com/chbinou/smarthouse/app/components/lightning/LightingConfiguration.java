package com.chbinou.smarthouse.app.components.lightning;

import com.chbinou.smarthouse.app.SmartHouseApp;
import com.chbinou.smarthouse.app.components.common.Mcp;
import com.chbinou.smarthouse.app.components.common.Provider;
import com.chbinou.smarthouse.app.components.lightning.model.Lamp;
import com.chbinou.smarthouse.app.components.lightning.model.Window;
import com.chbinou.smarthouse.app.config.GsonConfiguration;
import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.i2c.I2CBus;
import spark.utils.IOUtils;

import java.util.List;

/**
 * Created by yassine on 07/01/2017.
 */
public class LightingConfiguration
{


    public static LightingConfiguration instance;
    static final GpioController gpio = GpioFactory.getInstance();

    static
    {
        try
        {
            instance = GsonConfiguration.getGsonInstance().fromJson(
                    IOUtils.toString(SmartHouseApp.class.getClassLoader().getResourceAsStream("lightning_config.json")),
                    LightingConfiguration.class
            );

            for (Mcp mcp : instance.getMcps())
            {
                Mcp.setInstance(new MCP23017GpioProvider(I2CBus.BUS_1, Mcp.getAddresse()));
            }
            for( Lamp lamp : instance.getLamps())
            {

                Mcp mc = LightingConfiguration.instance.getMcps().stream().filter(
                        o -> o.getIdentifier().equals(lamp.getIdentifier())).findFirst().get();


               gpio.provisionDigitalInputPin(mc.getInstance(), lamp.getAddressInput());
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public LightingConfiguration() {
    }

    public List<Mcp> getMcps() {
        return mcps;
    }

    public void setMcps(List<Mcp> mcps) {
        this.mcps = mcps;
    }

    private List<Provider> providers;
    private List<Lamp> lamps;
    private List<Window> windows;
    private List<Mcp> mcps;

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

    public List<Provider> getProviders() {
        return providers;
    }

    public void setProviders(List<Provider> providers) {
        this.providers = providers;
    }
}
