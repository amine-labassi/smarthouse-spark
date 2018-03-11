import  smbus

from api.jsonManager.McpParser import Mcps
bus = smbus.SMBus(1)
PORTA = 0x12
PORTB = 0x13

for m in Mcps:
    bus.write_byte_data(m.address, 0x00, m.porta)
    bus.write_byte_data(m.address, 0x01, m.porta)
    bus.write_byte_data(m.address, PORTA, 0xff)
    bus.write_byte_data(m.address, PORTB, 0xff)

def setStatus(mcp, pin, status):
    if pin in range(0,7):
        input = bus.read_byte_data(0x20,PORTA)
        if status == True:
            input = input | (1 << pin)
            bus.write_byte_data(m.address, PORTA, input)
        elif status == False:
            input = input & (255 - (255 & ( 1 << pin)))
            bus.write_byte_data(m.address, PORTA, input)
    elif pin in range(8, 16):
        pin = pin-8
        input = bus.read_byte_data(0x20, PORTB)
        if status == True:
            input = input | (1 << pin)
            bus.write_byte_data(m.address, PORTB, input)
        elif status == False:
            input = input & (255 - (255 & (1 << pin)))
            bus.write_byte_data(m.address, PORTB, input)
    return True

def getPinStatus(mcp, pin):
    if pin in range(0,7):
        input =  bus.read_byte_data(0x20,PORTA)
        input = input & (1 << pin)
        if pin > 0:
            return True
        elif pin == 0:
            return False
    elif pin in range(8,16):
        pin = pin - 8
        input =  bus.read_byte_data(0x20,PORTB)
        input = input & (1 << pin)
        if pin > 0:
            return True
        elif pin == 0:
            return False
