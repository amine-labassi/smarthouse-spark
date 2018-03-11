import time

from api.jsonManager.ElectronicParser import ElectronicInterface
from api.electronic.ElectronicInit import getPinStatus, setStatus

def setSwitchOnAirConditionner(AirConditionner):
    if getPinStatus(AirConditionner.mcpInput, AirConditionner.addressInput) == True:
        setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, True)
        time.sleep(200)
        setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, False)
        return True
    return True

def setSwitchOffAirConditionner(AirConditionner):
    if getPinStatus(AirConditionner.mcpInput, AirConditionner.addressInput) == False:
        setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, True)
        time.sleep(200)
        setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, False)
        return True
    return True

def setSwitchOnAirConditionnerAll():
    for i in ElectronicInterface:
        for AirConditionner in i.airConditionners:
            if getPinStatus(AirConditionner.mcpInput, AirConditionner.addressInput) == True:
                setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, True)
                time.sleep(200)
                setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, False)
    return True

def setSwitchOffAirConditionnerAll():
    for i in ElectronicInterface:
        for AirConditionner in i.airConditionners:
            if getPinStatus(AirConditionner.mcpInput, AirConditionner.addressInput) == False:
                setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, True)
                time.sleep(200)
                setStatus(AirConditionner.mcpOutput, AirConditionner.addressOutput, False)
    return True

