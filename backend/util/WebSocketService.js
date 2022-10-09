var omitDeep = require('omit-deep');
var lampMgr = require('../managers/LampsManager');
var coolerMgr = require('../managers/CoolersManager');

class WebSocketService {

    constructor() {
        this.sessoins = {};
    }

    addSession(session) {
        console.log('add ws session : ' + session.socket.server.sessionIdContext);
        this.sessoins[session.socket.server.sessionIdContext] = session;
    }

    removeSession(session) {
        console.log('remove ws session : ' + session.socket.server.sessionIdContext);
        delete this.sessoins[session.socket.server.sessionIdContext];
    }

    notifyAllClients(zones) {
        if (typeof zones === 'object') {

            Object.values(this.sessoins).forEach((session) =>{
                session.sendUTF(JSON.stringify(
                    omitDeep(
                        JSON.parse(JSON.stringify(zones)),
                        ['arduino',
                            'addressInput', 'addressOutput',
                             'addressUp', 'upTime',
                             'downTime']
                    )
                ));
            });
        }
    }
}

module.exports = new WebSocketService();