/**
 * Created by amine on 18/02/2018.
 */
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    let jwt = localStorage.getItem("token");
    if(!req.url.endsWith("/login") && typeof jwt !== 'undefined'){
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      });
    }
    return next.handle(req);
  }
}
