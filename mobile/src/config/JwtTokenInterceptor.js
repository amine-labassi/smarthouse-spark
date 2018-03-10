var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by amine on 18/02/2018.
 */
import { Injectable } from '@angular/core';
var JwtTokenInterceptor = (function () {
    function JwtTokenInterceptor() {
    }
    JwtTokenInterceptor.prototype.intercept = function (req, next) {
        var jwt = localStorage.getItem("token");
        if (!req.url.endsWith("/login") && typeof jwt !== 'undefined') {
            req = req.clone({
                setHeaders: {
                    Authorization: 'JWT ' + jwt
                }
            });
        }
        return next.handle(req);
    };
    JwtTokenInterceptor = __decorate([
        Injectable()
    ], JwtTokenInterceptor);
    return JwtTokenInterceptor;
}());
export { JwtTokenInterceptor };
//# sourceMappingURL=JwtTokenInterceptor.js.map