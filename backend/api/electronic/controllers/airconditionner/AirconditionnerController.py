from flask_jwt import jwt_required
from api import app
from api.jsonManager.ElectronicParser import ElectronicInterface
from api.config.Constantes import   API_SWITCHOFF_CLIMATISEUR, API_SWITCHON_CLIMATISEUR, API_SWITCHOFF_CLIMATISEUR_ALL, API_SWITCHON_CLIMATISEUR_ALL




@app.route(API_SWITCHON_CLIMATISEUR, methods = ['GET'])
@jwt_required()
def switchOnAircoditionner(identifierzone, identifier):
    return True

@app.route(API_SWITCHOFF_CLIMATISEUR, methods = ['GET'])
@jwt_required()
def switchOffAircoditionner(identifierzone, identifier):
    return True

@app.route(API_SWITCHON_CLIMATISEUR_ALL, methods = ['GET'])
@jwt_required()
def switchOnAircoditionnerAll():
    return True

@app.route(API_SWITCHOFF_CLIMATISEUR_ALL, methods = ['GET'])
@jwt_required()
def switchOffAircoditionnerAll():
    return True


def getAirconditionner(identifierzone, identifier):
    for zone in ElectronicInterface:
        if zone.id == identifierzone:
            for lamp in zone.lamps:
                if lamp.identifier == identifier:
                    return lamp
