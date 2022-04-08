import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from './interfaces';
import { UserService } from '../user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse){
        if(event.url.endsWith('login') || event.url.endsWith('users')){    
          const loggedUser: IUser = event.body;
          this.userService.handleLogin(loggedUser);
        }else if(event.url.endsWith('logout')) {
          this.userService.handleLogout();
        }
      }
    }));
  }
}
