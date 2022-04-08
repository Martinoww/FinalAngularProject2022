import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILike } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpClient: HttpClient) { }

  loadlikes(): Observable<ILike[]> {
    return this.httpClient.get<ILike[]>(`${environment.apiUrl}classes/Likes`)
  }

  createLike(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}classes/Likes`, JSON.stringify(body))
  }

  deleteLike(id): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}classes/Likes/${id}`)
  }

}
