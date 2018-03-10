from werkzeug.security import safe_str_cmp
import sys
import hashlib

from api.config.environment.Environment import getPass
from api.config.security.User import User



users = [
    User(1, 'smartHouseOwner', getPass()),
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
    

