import multiprocessing
import threading
import time
from flask_jwt import jwt_required
from api import app
from api.electronic.controllers.lighting.LightingManager import setStatusLamp, setSwitchOnLamp, setSwitchOffLamp
from api.jsonManager.ElectronicParser import ElectronicInterface
import json
from api.jsonManager.JsonWriter import status


from api.config.Constantes import   API_STATUS_LAMP_ALL, API_SWITCHOFF_LAMP, API_SWITCHON_LAMP, API_SWITCHOFF_LAMP_ALL, API_SWITCHON_LAMP_ALL

@app.route(API_STATUS_LAMP_ALL, methods = ['GET'])
@jwt_required()
def statusLamp():
    #setStatusLamp()
    return json.dumps(status())

def t():
    time.sleep(5)
    print 'ok'
@app.route(API_SWITCHON_LAMP, methods = ['GET'])
@jwt_required()
def switchOnLamp(identifierzone, identifier):
    setSwitchOnLamp(getlamp(identifierzone, identifier))
    return True

@app.route(API_SWITCHOFF_LAMP, methods = ['GET'])
@jwt_required()
def switchOffLamp(identifierzone, identifier):
    setSwitchOffLamp(getlamp(identifierzone, identifier))
    return True

@app.route(API_SWITCHON_LAMP_ALL, methods = ['GET'])
@jwt_required()
def switchOnLampAll():
    return True

@app.route(API_SWITCHOFF_LAMP_ALL, methods = ['GET'])
@jwt_required()
def switchOffLampAll():
    return json.dumps(status())


def getlamp(identifierzone, identifier):
    for zone in ElectronicInterface:
        if zone.id == identifierzone:
            for lamp in zone.lamps:
                if lamp.identifier == identifier:
                    print json.dumps(lamp)
                    return lamp
