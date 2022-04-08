import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILike } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private _headers = new HttpHeaders()
  .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
  .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
  .set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  loadlikes(): Observable<ILike[]> {
    return this.httpClient.get<ILike[]>(`${environment.apiUrl}classes/Likes`, {'headers': this._headers})
  }

  createLike(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}classes/Likes`, JSON.stringify(body), {'headers': this._headers})
  }

  deleteLike(id): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}classes/Likes/${id}`, {'headers': this._headers})
  }

}
