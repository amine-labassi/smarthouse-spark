
from api import socketio


@socketio.on('connect', namespace='/push')
def test_connect():
    print('Client conecded')


@socketio.on('disconnect', namespace='/push')
def test_disconnect():
    print('Client disconnected')
