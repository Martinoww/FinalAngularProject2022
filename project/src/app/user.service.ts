import { HttpClient } from '@angular/common/http';
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
  isLogged$: Observable<boolean> = this.currentUser$.pipe(map(user => {
    const userData = this.authService.getItem('userData');
    if(!!user) {
      return !!user
    }else if(!!user == false){
      if(!!userData){
        return !!userData
      }
    }
    return !!user
     
  })); 


  constructor(private httpClient: HttpClient, private authService: AuthService) { 

  }

  login$(userData: {username: string, password: string}): Observable<IUser> {
    return  this.httpClient.post<IUser>(`${environment.apiUrl}login`, JSON.stringify(userData)).pipe(map(response => {
      this.authService.setItem('userData', response)
      return response
    }));
  }

  register$(userData: {username: string, password: string, email: string}): Observable<IUser> {
    return  this.httpClient.post<IUser>(`${environment.apiUrl}users`, JSON.stringify(userData)).pipe(map(response => {
      userData['objectId'] = response.objectId;
      userData['sessionToken'] = response.sessionToken;
      userData['createdAt'] = response.createdAt;
      
    this.authService.setItem('userData', userData)
      
      return response
    }));
  }

  logout$(): Observable<void> {
    this.authService.removeItem('userData');
    return this.httpClient.post<void>(`${environment.apiUrl}logout`, {});
  }
    
  handleLogin(user: IUser){
    this._currentUser.next(user)
  }

  handleLogout(){
    this._currentUser.next(undefined)
  }

}
