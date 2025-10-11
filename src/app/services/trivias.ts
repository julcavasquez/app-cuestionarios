import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class TriviaService {
  private apiUrl = environment.apiUrl+'/trivias';

  constructor(private http: HttpClient) {}

    getTriviaDelDia(): Observable<any> {
        return this.http.get(`${this.apiUrl}/dia`);
    }

    responderTrivia(payload: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/responder`, payload);
    }

}
