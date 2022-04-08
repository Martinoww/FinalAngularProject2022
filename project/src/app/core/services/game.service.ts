import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from '../interfaces'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GameService {


 private _headers = new HttpHeaders()
  .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
  .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
  .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
    
  loadGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.apiUrl}classes/Games`, {'headers': this._headers})
    }

  loadGameById(id): Observable<IGame> {
    return this.http.get<IGame>(`${environment.apiUrl}classes/Games/${id}`, {'headers': this._headers})
    }

  deleteGame(paramId): Observable<any> {
    return  this.http.delete<any>(`${environment.apiUrl}classes/Games/${paramId}`, {'headers': this._headers})
  }

  createGame(body): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}classes/Games`, JSON.stringify(body), {'headers': this._headers})
  }

  editGame(paramId, body): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}classes/Games/${paramId}`, JSON.stringify(body), {'headers': this._headers})
  }

}
