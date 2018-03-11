import json

#jsonFile = open("C:/Users/Yassine Chbinou/Documents/WorckSpace/smarthouse-spark/backend/api/resources/lightning_config.json").read()
jsonFile = open("/home/pi/backend/api/resources/lightning_config.json").read()

#/home/pi/backend/api/resources/
data = json.loads(jsonFile)

zones = data['zones']

mcps = data['mcps']

