import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from './interfaces';
import { UserService } from '../user.service';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private authService: AuthService) {
    
  }
  
  
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const  userDataSessionToken = this.authService.getItem('userData') === null ? '' : this.authService.getItem('userData')['sessionToken']
    request = request.clone({
      setHeaders: {
        'X-Parse-Application-Id': 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz',
        'X-Parse-REST-API-Key': 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8',
        'X-Parse-Revocable-Session': '1',
        'Content-Type': 'application/json',
        'X-Parse-Session-Token': `${userDataSessionToken}`
      }
    }) 

    return next.handle(request).pipe(
      tap(event => {
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
