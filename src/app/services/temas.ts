import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemasService {
  private apiUrl = 'http://localhost:3001/api/temas';

  constructor(private http: HttpClient) {}

  getTemas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCuestionario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
