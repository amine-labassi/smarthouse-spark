import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
var SmartHouseAppBroadcaster = (function () {
    function SmartHouseAppBroadcaster() {
        this._eventBus = new Subject();
    }
    SmartHouseAppBroadcaster.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    SmartHouseAppBroadcaster.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return SmartHouseAppBroadcaster;
}());
export { SmartHouseAppBroadcaster };
//# sourceMappingURL=SmartHouseAppBroadcaster.js.map