var omitDeep = require('omit-deep');

class WebSocketService {
    
    constructor(){
      this.sessoins = {};
    }

    addSession(session){
        console.log('add ws session : ' + session.socket.server.sessionIdContext);
        this.sessoins[session.socket.server.sessionIdContext] = session;
    }

    removeSession(session){
        console.log('remove ws session : ' + session.socket.server.sessionIdContext);
        delete this.sessoins[session.socket.server.sessionIdContext];
    }

    notifyAllClients(zones){
        if(typeof data === 'string' && data.length > 0){
            Object.values(this.sessoins).forEach((session) => {
                session.send(JSON.stringify(
                    omitDeep(
                        zones,
                        ['mcpInput', 'mcpOutput',
                            'addressInput', 'addressOutput',
                            'mcpUp', 'addressUp', 'upTime',
                            'mcpDown', 'addressDown', 'downTime']
                    )
                ));
            });
        }
    }
}

module.exports = new WebSocketService();