import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './core/interfaces';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = new BehaviorSubject<IUser>(undefined);
  currentUser$ = this._currentUser.asObservable();
  isLogged$: Observable<boolean> = this.currentUser$.pipe(map(user => !!user)); 

  headers = new HttpHeaders()
    .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
    .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
    .set('X-Parse-Revocable-Session', '1')
    .set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private authService: AuthService) { 

  }

  login$(userData: {username: string, password: string}): Observable<IUser> {
    return  this.httpClient.post<IUser>(`${environment.apiUrl}login`, JSON.stringify(userData), {'headers': this.headers}).pipe(map(response => {
      this.authService.setItem('userData', response)
      return response
    }));
  }

  register$(userData: {username: string, password: string, email: string}): Observable<IUser> {
    this.authService.setItem('userData', userData)
    return  this.httpClient.post<IUser>(`${environment.apiUrl}users`, JSON.stringify(userData), {'headers': this.headers});
  }

  logout$(): Observable<void> {
    this.authService.removeItem('userData');
    return this.httpClient.post<void>(`${environment.apiUrl}logout`, {}, {'headers': this.headers});
  }
    
  handleLogin(user: IUser){
    this._currentUser.next(user)
  }

  handleLogout(){
    this._currentUser.next(undefined)
  }

}