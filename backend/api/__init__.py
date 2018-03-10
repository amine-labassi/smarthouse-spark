import threading

import time

import datetime
from flask import Flask
from flask_jwt import JWT
from flask_socketio import SocketIO
import eventlet

from api.config.environment.Environment import getCert, getKey
from api.config.security.BasicAuthenticator import authenticate, identity

import api.electronic.ElectronicInit


app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['JWT_AUTH_URL_RULE'] = '/api/login'
eventlet.monkey_patch()
socketio = SocketIO(app,async_mode='eventlet' , logger=True, engineio_logger=True)



import api.electronic.controllers.lighting.LightingController
import api.electronic.controllers.windows.WindowsController
import api.electronic.controllers.airconditionner.AirconditionnerController
import api.config.websocket.SocketIoConf
jwt = JWT(app, authenticate, identity)
