
from flask import Flask
from api.config.environment.Environment import getCert, getKey
from api.config.websocket.PeriodicTask import job
from api  import app
if __name__ == '__main__':
    job()
    app.run(host='0.0.0.0',port = 5100, ssl_context=(getCert(), getKey()))
    #wsgi.server(eventlet.wrap_ssl(('0.0.0.0', 5100), certfile=getCert(), keyfile=getKey(), server_side=True), socketio)
    #socketio.run(app, host='0.0.0.0',port=5100,ssl_context='adhoc')