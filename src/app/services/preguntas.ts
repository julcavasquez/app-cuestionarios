import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreguntasService {
  private apiUrl = 'http://localhost:3001/api/preguntas';

  constructor(private http: HttpClient) {}

  guardarPreguntas(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }
}
