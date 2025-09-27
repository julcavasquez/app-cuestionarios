import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CuestionariosService {
  private apiUrl = 'http://localhost:3001/api/cuestionarios';

  constructor(private http: HttpClient) {}

  getCuestionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCuestionario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getCuestionarioId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  guardarPreguntas(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/preguntas`, payload);
  }

   getCuestionarioCompleto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/completo`);
  }
}
