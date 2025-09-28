import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class CuestionariosService {
  private apiUrl = environment.apiUrl+'/cuestionarios';

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

  guardarCuestionario(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

   getCuestionarioCompleto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/completo`);
  }
}
