from api.jsonManager.JsonFileReader import mcps
from api.electronic.model.Mcp import Mcp

def getMcps(mcps):
    list = []
    for mcp in mcps:
        list.append(Mcp(mcp['address'], mcp['porta'], mcp['portb']))
    return list

Mcps = getMcps(mcps)