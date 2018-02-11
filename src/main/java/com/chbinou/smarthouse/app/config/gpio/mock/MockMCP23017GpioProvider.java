package com.chbinou.smarthouse.app.config.gpio.mock;

import com.pi4j.gpio.extension.mcp.MCP23017GpioProvider;
import com.pi4j.gpio.extension.mcp.MCP23017Pin;
import com.pi4j.io.gpio.*;
import com.pi4j.io.gpio.event.PinDigitalStateChangeEvent;
import com.pi4j.io.gpio.event.PinListener;
import com.pi4j.io.gpio.exception.InvalidPinException;
import com.pi4j.io.gpio.exception.UnsupportedPinPullResistanceException;
import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CDevice;
import com.pi4j.io.i2c.I2CFactory;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

/**
 * Created by amine on 08/07/2017.
 */
public class MockMCP23017GpioProvider extends MockGpioProvider
{
  /*  public static final String NAME = "com.pi4j.gpio.extension.mcp.MCP23017GpioProvider";
    public static final String DESCRIPTION = "MCP23017 GPIO Provider";
    public static final int DEFAULT_ADDRESS = 32;
    public static final int DEFAULT_POLLING_TIME = 50;
    private static final int REGISTER_IODIR_A = 0;
    private static final int REGISTER_IODIR_B = 1;
    private static final int REGISTER_GPINTEN_A = 4;
    private static final int REGISTER_GPINTEN_B = 5;
    private static final int REGISTER_DEFVAL_A = 6;
    private static final int REGISTER_DEFVAL_B = 7;
    private static final int REGISTER_INTCON_A = 8;
    private static final int REGISTER_INTCON_B = 9;
    private static final int REGISTER_GPPU_A = 12;
    private static final int REGISTER_GPPU_B = 13;
    private static final int REGISTER_INTF_A = 14;
    private static final int REGISTER_INTF_B = 15;
    private static final int REGISTER_GPIO_A = 18;
    private static final int REGISTER_GPIO_B = 19;
    private static final int GPIO_A_OFFSET = 0;
    private static final int GPIO_B_OFFSET = 1000;
    private int currentStatesA;
    private int currentStatesB;
    private int currentDirectionA;
    private int currentDirectionB;
    private int currentPullupA;
    private int currentPullupB;
    private int pollingTime;
    private boolean i2cBusOwner;
    private final I2CBus bus;
    private final I2CDevice device;
    private MCP23017GpioProvider.GpioStateMonitor monitor;

    public MockMCP23017GpioProvider(int busNumber, int address) throws I2CFactory.UnsupportedBusNumberException, IOException {
        this(busNumber, address, 50);
    }

    public MockMCP23017GpioProvider(int busNumber, int address, int pollingTime) throws IOException, I2CFactory.UnsupportedBusNumberException {
        this(I2CFactory.getInstance(busNumber), address, pollingTime);
    }

    public MockMCP23017GpioProvider(I2CBus bus, int address) throws IOException {
        this(bus, address, 50);
    }

    public MockMCP23017GpioProvider(I2CBus bus, int address, int pollingTime) throws IOException {
        this.currentStatesA = 0;
        this.currentStatesB = 0;
        this.currentDirectionA = 0;
        this.currentDirectionB = 0;
        this.currentPullupA = 0;
        this.currentPullupB = 0;
        this.pollingTime = 50;
        this.i2cBusOwner = false;
        this.monitor = null;
        this.bus = bus;
        this.device = bus.getDevice(address);
        this.currentStatesA = this.device.read(18);
        this.currentStatesB = this.device.read(19);
        this.device.write(0, (byte)this.currentDirectionA);
        this.device.write(1, (byte)this.currentDirectionB);
        this.device.write(4, (byte)this.currentDirectionA);
        this.device.write(5, (byte)this.currentDirectionB);
        this.device.write(6, 0);
        this.device.write(7, 0);
        this.device.write(8, 0);
        this.device.write(9, 0);
        this.device.write(18, (byte)this.currentStatesA);
        this.device.write(19, (byte)this.currentStatesB);
        this.device.write(12, (byte)this.currentPullupA);
        this.device.write(13, (byte)this.currentPullupB);
        this.pollingTime = pollingTime;
        this.i2cBusOwner = true;
    }

    public String getName() {
        return "com.pi4j.gpio.extension.mcp.MCP23017GpioProvider";
    }

    public void export(Pin pin, PinMode mode) {
        super.export(pin, mode);
        this.setMode(pin, mode);
    }

    public void unexport(Pin pin) {
        super.unexport(pin);
        this.setMode(pin, PinMode.DIGITAL_OUTPUT);
    }

    public void setMode(Pin pin, PinMode mode) {
        super.setMode(pin, mode);

        try {
            if(pin.getAddress() < 1000) {
                this.setModeA(pin, mode);
            } else {
                this.setModeB(pin, mode);
            }
        } catch (IOException var4) {
            throw new RuntimeException(var4);
        }

        if(this.currentDirectionA <= 0 && this.currentDirectionB <= 0) {
            if(this.monitor != null) {
                this.monitor.shutdown();
                this.monitor = null;
            }
        } else if(this.monitor == null) {
            this.monitor = new MCP23017GpioProvider.GpioStateMonitor(this.device);
            this.monitor.start();
        }

    }

    private void setModeA(Pin pin, PinMode mode) throws IOException {
        int pinAddress = pin.getAddress() - 0;
        if(mode == PinMode.DIGITAL_INPUT) {
            this.currentDirectionA |= pinAddress;
        } else if(mode == PinMode.DIGITAL_OUTPUT) {
            this.currentDirectionA &= ~pinAddress;
        }

        this.device.write(0, (byte)this.currentDirectionA);
        this.device.write(4, (byte)this.currentDirectionA);
    }

    private void setModeB(Pin pin, PinMode mode) throws IOException {
        int pinAddress = pin.getAddress() - 1000;
        if(mode == PinMode.DIGITAL_INPUT) {
            this.currentDirectionB |= pinAddress;
        } else if(mode == PinMode.DIGITAL_OUTPUT) {
            this.currentDirectionB &= ~pinAddress;
        }

        this.device.write(1, (byte)this.currentDirectionB);
        this.device.write(5, (byte)this.currentDirectionB);
    }

    public PinMode getMode(Pin pin) {
        return super.getMode(pin);
    }

    public void setState(Pin pin, PinState state) {
        super.setState(pin, state);

        try {
            if(pin.getAddress() < 1000) {
                this.setStateA(pin, state);
            } else {
                this.setStateB(pin, state);
            }

        } catch (IOException var4) {
            throw new RuntimeException(var4);
        }
    }

    private void setStateA(Pin pin, PinState state) throws IOException {
        int pinAddress = pin.getAddress() - 0;
        if(state.isHigh()) {
            this.currentStatesA |= pinAddress;
        } else {
            this.currentStatesA &= ~pinAddress;
        }

        this.device.write(18, (byte)this.currentStatesA);
    }

    private void setStateB(Pin pin, PinState state) throws IOException {
        int pinAddress = pin.getAddress() - 1000;
        if(state.isHigh()) {
            this.currentStatesB |= pinAddress;
        } else {
            this.currentStatesB &= ~pinAddress;
        }

        this.device.write(19, (byte)this.currentStatesB);
    }

    public PinState getState(Pin pin) {
        super.getState(pin);
        PinState result;
        if(pin.getAddress() < 1000) {
            result = this.getStateA(pin);
        } else {
            result = this.getStateB(pin);
        }

        return result;
    }

    private PinState getStateA(Pin pin) {
        int pinAddress = pin.getAddress() - 0;
        PinState state = (this.currentStatesA & pinAddress) == pinAddress?PinState.HIGH:PinState.LOW;
        this.getPinCache(pin).setState(state);
        return state;
    }

    private PinState getStateB(Pin pin) {
        int pinAddress = pin.getAddress() - 1000;
        PinState state = (this.currentStatesB & pinAddress) == pinAddress?PinState.HIGH:PinState.LOW;
        this.getPinCache(pin).setState(state);
        return state;
    }

    public void setPullResistance(Pin pin, PinPullResistance resistance) {
        if(!this.hasPin(pin)) {
            throw new InvalidPinException(pin);
        } else if(!pin.getSupportedPinPullResistance().contains(resistance)) {
            throw new UnsupportedPinPullResistanceException(pin, resistance);
        } else {
            try {
                if(pin.getAddress() < 1000) {
                    this.setPullResistanceA(pin, resistance);
                } else {
                    this.setPullResistanceB(pin, resistance);
                }
            } catch (IOException var4) {
                throw new RuntimeException(var4);
            }

            this.getPinCache(pin).setResistance(resistance);
        }
    }

    private void setPullResistanceA(Pin pin, PinPullResistance resistance) throws IOException {
        int pinAddress = pin.getAddress() - 0;
        if(resistance == PinPullResistance.PULL_UP) {
            this.currentPullupA |= pinAddress;
        } else {
            this.currentPullupA &= ~pinAddress;
        }

        this.device.write(12, (byte)this.currentPullupA);
    }

    private void setPullResistanceB(Pin pin, PinPullResistance resistance) throws IOException {
        int pinAddress = pin.getAddress() - 1000;
        if(resistance == PinPullResistance.PULL_UP) {
            this.currentPullupB |= pinAddress;
        } else {
            this.currentPullupB &= ~pinAddress;
        }

        this.device.write(13, (byte)this.currentPullupB);
    }

    public PinPullResistance getPullResistance(Pin pin) {
        return super.getPullResistance(pin);
    }

    public void shutdown() {
        if(!this.isShutdown()) {
            super.shutdown();

            try {
                if(this.monitor != null) {
                    this.monitor.shutdown();
                    this.monitor = null;
                }

                if(this.i2cBusOwner) {
                    this.bus.close();
                }

            } catch (IOException var2) {
                throw new RuntimeException(var2);
            }
        }
    }

    public void setPollingTime(int pollingTime) {
        this.pollingTime = pollingTime;
    }

    private class GpioStateMonitor extends Thread {
        private final I2CDevice device;
        private boolean shuttingDown = false;

        public GpioStateMonitor(I2CDevice device) {
            this.device = device;
        }

        public void shutdown() {
            this.shuttingDown = true;
        }

        public void run() {
            while(!this.shuttingDown) {
                try {
                    Class var1 = MCP23017GpioProvider.class;
                    synchronized(MCP23017GpioProvider.class) {
                        int pinInterruptB;
                        int pinInterruptState;
                        Pin[] var4;
                        int var5;
                        int var6;
                        Pin pin;
                        int pinAddressB;
                        if(MCP23017GpioProvider.this.currentDirectionA > 0) {
                            pinInterruptB = this.device.read(14);
                            if(pinInterruptB > 0) {
                                pinInterruptState = this.device.read(18);
                                var4 = MCP23017Pin.ALL_A_PINS;
                                var5 = var4.length;

                                for(var6 = 0; var6 < var5; ++var6) {
                                    pin = var4[var6];
                                    pinAddressB = pin.getAddress() - 0;
                                    this.evaluatePinForChangeA(pin, pinInterruptState);
                                }
                            }
                        }

                        if(MCP23017GpioProvider.this.currentDirectionB > 0) {
                            pinInterruptB = this.device.read(15);
                            if(pinInterruptB > 0) {
                                pinInterruptState = this.device.read(19);
                                var4 = MCP23017Pin.ALL_B_PINS;
                                var5 = var4.length;

                                for(var6 = 0; var6 < var5; ++var6) {
                                    pin = var4[var6];
                                    pinAddressB = pin.getAddress() - 1000;
                                    this.evaluatePinForChangeB(pin, pinInterruptState);
                                }
                            }
                        }
                    }

                    Thread.currentThread();
                    Thread.sleep((long)MCP23017GpioProvider.this.pollingTime);
                } catch (Exception var11) {
                    var11.printStackTrace();
                }
            }

        }

        private void evaluatePinForChangeA(Pin pin, int state) {
            if(MCP23017GpioProvider.this.getPinCache(pin).isExported()) {
                int pinAddress = pin.getAddress() - 0;
                if((state & pinAddress) != (MCP23017GpioProvider.this.currentStatesA & pinAddress)) {
                    PinState newState = (state & pinAddress) == pinAddress?PinState.HIGH:PinState.LOW;
                    MCP23017GpioProvider.this.getPinCache(pin).setState(newState);
                    if(newState.isHigh()) {
                        MCP23017GpioProvider.this.currentStatesA = MCP23017GpioProvider.this.currentStatesA | pinAddress;
                    } else {
                        MCP23017GpioProvider.this.currentStatesA = MCP23017GpioProvider.this.currentStatesA & ~pinAddress;
                    }

                    this.dispatchPinChangeEvent(pin.getAddress(), newState);
                }
            }

        }

        private void evaluatePinForChangeB(Pin pin, int state) {
            if(MCP23017GpioProvider.this.getPinCache(pin).isExported()) {
                int pinAddress = pin.getAddress() - 1000;
                if((state & pinAddress) != (MCP23017GpioProvider.this.currentStatesB & pinAddress)) {
                    PinState newState = (state & pinAddress) == pinAddress?PinState.HIGH:PinState.LOW;
                    MCP23017GpioProvider.this.getPinCache(pin).setState(newState);
                    if(newState.isHigh()) {
                        MCP23017GpioProvider.this.currentStatesB = MCP23017GpioProvider.this.currentStatesB | pinAddress;
                    } else {
                        MCP23017GpioProvider.this.currentStatesB = MCP23017GpioProvider.this.currentStatesB & ~pinAddress;
                    }

                    this.dispatchPinChangeEvent(pin.getAddress(), newState);
                }
            }

        }

        private void dispatchPinChangeEvent(int pinAddress, PinState state) {
            Iterator var3 = MCP23017GpioProvider.this.listeners.keySet().iterator();

            while(true) {
                Pin pin;
                do {
                    if(!var3.hasNext()) {
                        return;
                    }

                    pin = (Pin)var3.next();
                } while(pin.getAddress() != pinAddress);

                Iterator var5 = ((List)MCP23017GpioProvider.this.listeners.get(pin)).iterator();

                while(var5.hasNext()) {
                    PinListener listener = (PinListener)var5.next();
                    listener.handlePinEvent(new PinDigitalStateChangeEvent(this, pin, state));
                }
            }
        }
    }*/
}
