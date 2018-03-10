from api import app, socketio, getKey, getCert
from api.config.websocket.PeriodicTask import job

if __name__ == '__main__':
    job()
    socketio.run(app, host='0.0.0.0',port=5100, ssl_context=(getCert(), getKey()))
