import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class TemasService {
  private apiUrl = environment.apiUrl+'/temas';

  constructor(private http: HttpClient) {}

  getTemas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAllCompetencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/competencias`);
  }

   getDetalleCompetencia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/detallecompe`);
  }

  addCuestionario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  registrarTema(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getTemasCantidad(): Observable<any> {
    return this.http.get(`${this.apiUrl}/temascantidad`);
  }

  getSubCompetenciasPorCompetencia(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-competencia/${id}`);
  }

  getTemasPorSubCompetencias(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-subcompetencia/${id}`);
  }

}
