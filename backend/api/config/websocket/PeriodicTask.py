import threading, datetime
from api.jsonManager.JsonWriter import status
from api.electronic.controllers.lighting.LightingManager import setStatusLamp
import json
from flask_socketio import emit

from api import socketio


def job():
    setStatusLamp()
    try:
     socketio.emit('my response', {'data':  json.dumps(status())}, broadcast=True, namespace='/push')
    except:
        print 'ff'
    print datetime.datetime.now()
    reJob()

def reJob():
    threading.Timer(4, job).start()

   

