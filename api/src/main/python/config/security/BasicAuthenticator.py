from werkzeug.security import safe_str_cmp
import sys
import hashlib
from flask import jsonify


sys.path.insert(0, '/home/pi/smartHouse/src/main/python/config/security')
import User
sys.path.insert(0, '/home/pi/smartHouse/src/main/python/config/environment')
import Environment

class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id
        


users = [
    User(1, 'user1', Environment.getPass()),
]
username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}

def authenticate(username, password):
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password, hashlib.sha256(password).hexdigest()):
      return user

def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None)
    

