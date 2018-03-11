from api.electronic.model.Lamp import Lamp
from api.electronic.model.Zone import Zone
from api.electronic.model.Window import Window
from api.electronic.model.AirConditionner import AirConditionner
from api.jsonManager.JsonFileReader import zones

ElectronicInterface = []

def getLampOfZone(lamps):
    list = []
    for lamp in lamps:
        list.append(Lamp(lamp['identifier'], lamp['description'], lamp['status'], lamp['mcpInput'], lamp['mcpOutput'],
                         lamp['addressInput'], lamp['addressOutput']))
    return list



def getWindowOfZone(windows):
    list = []
    for window in windows:
        list.append(
            Window(window['identifier'], window['title'],  window['mcpUp'], window['mcpDown'], window['addressUp'],
                   window['upTime'], window['downTime']))
    return list



def getAirConditionnerOfZone(airConditionners):
    list = []
    for airConditionner in airConditionners:
        list.append(
            AirConditionner(airConditionner['identifier'], airConditionner['description'], airConditionner['status'],
                            airConditionner['mcpInput'], airConditionner['mcpOutput'], airConditionner['addressInput'],
                            airConditionner['addressOutput']))
    return list




for zone in zones:
    ElectronicInterface.append(Zone(zone['id'], zone["title"], getLampOfZone(zone['lamps']),
                               getWindowOfZone(zone['windows']), getAirConditionnerOfZone(zone['airConditionners'])))

