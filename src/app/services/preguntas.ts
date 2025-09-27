import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class PreguntasService {
  private apiUrl = environment.apiUrl+'/preguntas';

  constructor(private http: HttpClient) {}

  guardarPreguntas(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }
}
