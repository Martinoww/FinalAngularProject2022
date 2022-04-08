import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from '../interfaces'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
    
  loadGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.apiUrl}classes/Games`)
    }

  loadGameById(id): Observable<IGame> {
    return this.http.get<IGame>(`${environment.apiUrl}classes/Games/${id}`)
    }

  deleteGame(paramId): Observable<any> {
    return  this.http.delete<any>(`${environment.apiUrl}classes/Games/${paramId}`)
  }

  createGame(body): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}classes/Games`, JSON.stringify(body))
  }

  editGame(paramId, body): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}classes/Games/${paramId}`, JSON.stringify(body))
  }

}
