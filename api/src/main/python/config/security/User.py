import sys
sys.path.insert(0, '/home/pi/smartHouse/src/main/python/config/environment')
import Environment



class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id
        
