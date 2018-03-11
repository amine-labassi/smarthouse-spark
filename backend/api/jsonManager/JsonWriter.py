from api.jsonManager.ElectronicParser import ElectronicInterface



def status():
    zonesList = []
    lampsList = []
    windowsList = []
    airconditionnerList = []
    for e in ElectronicInterface:
        for l in e.lamps:
            lampsList.append({
                'identifier': l.identifier,
                'description': l.description,
                'status': l.status
                })
        for w in e.windows:
            windowsList.append({
                'identifier': w.identifier,
                'title': w.title
            })
        for a in e.airConditionners:
            airconditionnerList.append({
                'identifier': a.identifier,
                'description': a.description,
                'status': a.status
                })
        zonesList.append({
            'id': e.id,
            'title': e.title,
            'lamps': lampsList,
            'windows': windowsList,
            'airConditionners': airconditionnerList})
    return zonesList