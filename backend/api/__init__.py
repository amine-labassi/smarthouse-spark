#import eventlet

#eventlet.monkey_patch()
from flask import Flask
from flask_jwt import JWT
from flask_socketio import SocketIO

from api.config.environment.Environment import getCert, getKey
from api.config.security.BasicAuthenticator import authenticate, identity

import api.electronic.ElectronicInit


app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['JWT_AUTH_URL_RULE'] = '/api/login'

socketio = SocketIO(app , logger=True, engineio_logger=True)
@app.route("/")
def hello():
    return "Hello World!"


import api.electronic.controllers.lighting.LightingController
import api.electronic.controllers.windows.WindowsController
import api.electronic.controllers.airconditionner.AirconditionnerController
import api.config.websocket.SocketIoConf
jwt = JWT(app, authenticate, identity)
