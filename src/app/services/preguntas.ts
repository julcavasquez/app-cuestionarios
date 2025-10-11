import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class PreguntasService {
  private apiUrl = environment.apiUrl+'/preguntas';

  constructor(private http: HttpClient) {}

  eliminarPregunta(id: number) {
  return this.http.put<any>(`${this.apiUrl}/eliminar/${id}`, {});
}

  guardarPreguntas(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  getPreguntas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

   obtenerPreguntasPorConfig(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/configuracion`, payload);
  }
}
