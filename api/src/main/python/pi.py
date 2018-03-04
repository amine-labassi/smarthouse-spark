from flask import Flask
from flask_jwt import JWT, jwt_required, current_identity
import sys

sys.path.insert(0, '/home/pi/smartHouse/src/main/python/config/environment')
import Environment
sys.path.insert(0, '/home/pi/smartHouse/src/main/python/config/schedule')
import PeriodicTask
sys.path.insert(0, '/home/pi/smartHouse/src/main/python/config/security')
import User
import BasicAuthenticator

from werkzeug.security import safe_str_cmp


app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['JWT_AUTH_URL_RULE'] = '/login'
jwt = JWT(app, BasicAuthenticator.authenticate, BasicAuthenticator.identity)

@app.route('/protected')
@jwt_required()
def protected():
    return 'yyyyy'
# dfsdfs
if __name__ == '__main__':
    PeriodicTask.job()
    app.run(host='0.0.0.0', ssl_context=(Environment.getCert(), Environment.getKey()), port=5000)
