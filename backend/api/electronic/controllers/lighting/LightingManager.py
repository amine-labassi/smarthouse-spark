import time

from api.jsonManager.ElectronicParser import ElectronicInterface
from api.electronic.ElectronicInit import getPinStatus, setStatus

def setStatusLamp():
    for i in ElectronicInterface:
        for lamp in i.lamps:
            lamp.status = getPinStatus(lamp.mcpInput, lamp.addressInput)
        for airConditionner in i.airConditionners:
            airConditionner.status =getPinStatus(airConditionner.mcpInput, airConditionner.addressInput)

def setSwitchOnLamp(lamp):
    if getPinStatus(lamp.mcpInput, lamp.addressInput) == True:
        setStatus(lamp.mcpOutput, lamp.addressOutput, True)
        time.sleep(200)
        setStatus(lamp.mcpOutput, lamp.addressOutput, False)
        return True
    return True

def setSwitchOffLamp(lamp):
    if getPinStatus(lamp.mcpInput, lamp.addressInput) == False:
        setStatus(lamp.mcpOutput, lamp.addressOutput, True)
        time.sleep(200)
        setStatus(lamp.mcpOutput, lamp.addressOutput, False)
        return True
    return True

def setSwitchOnLampAll():
    for i in ElectronicInterface:
        for lamp in i.lamps:
            if getPinStatus(lamp.mcpInput, lamp.addressInput) == True:
                setStatus(lamp.mcpOutput, lamp.addressOutput, True)
                time.sleep(200)
                setStatus(lamp.mcpOutput, lamp.addressOutput, False)
    return True

def setSwitchOffLampAll():
    for i in ElectronicInterface:
        for lamp in i.lamps:
            if getPinStatus(lamp.mcpInput, lamp.addressInput) == False:
                setStatus(lamp.mcpOutput, lamp.addressOutput, True)
                time.sleep(200)
                setStatus(lamp.mcpOutput, lamp.addressOutput, False)
    return True

