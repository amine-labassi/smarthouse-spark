from flask_jwt import jwt_required
from api import app
from api.config.Constantes import  API_POSITION_WINDOW, API_POSITION_WINDOW_ALL, API_SWITCHDOWN_WINDOW, API_SWITCHDOWN_WINDOW_ALL, API_SWITCHUP_WINDOW, API_SWITCHUP_WINDOW_ALL
from api.jsonManager.ElectronicParser import  ElectronicInterface

@app.route(API_SWITCHUP_WINDOW, methods = ['GET'])
@jwt_required()
def switchUpWindow(identifierzone, identifier):
    getWindow(identifierzone, identifier)
    return True

@app.route(API_SWITCHDOWN_WINDOW, methods = ['GET'])
@jwt_required()
def switchDownWindow(identifierzone, identifier):
    getWindow(identifierzone, identifier)
    return True

@app.route(API_SWITCHUP_WINDOW_ALL, methods = ['GET'])
@jwt_required()
def switchUpWindowAll():
    return True

@app.route(API_SWITCHDOWN_WINDOW_ALL, methods = ['GET'])
@jwt_required()
def switchDownWindowAll():
    return True

@app.route(API_POSITION_WINDOW, methods = ['GET'])
@jwt_required()
def switchPosWindow(identifierzone, identifier, pos):
    getWindow(identifierzone, identifier)
    return True

@app.route(API_POSITION_WINDOW, methods = ['GET'])
@jwt_required()
def switchPosWindowAll(pos):

    return True

def getWindow(identifierzone, identifier):

    for zone in ElectronicInterface:
        if zone.id == identifierzone :
           for window in zone.windows:
               if window.identifier == identifier:
                   return window
