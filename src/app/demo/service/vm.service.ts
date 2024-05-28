// src/app/demo/service/vm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vm } from '../api/vm';

@Injectable({
  providedIn: 'root'
})
export class VmService {private apiUrl = 'http://localhost:3000/vm';

  constructor(private http: HttpClient) {}

  getVms(): Observable<Vm[]> {
    return this.http.get<Vm[]>(this.apiUrl);
  }

  
  deleteVm(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteVms(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteMany`, { ids });
  }
// Add this method to get a vm by ID
getVmById(id: string): Observable<Vm> {
  return this.http.get<Vm>(`${this.apiUrl}/${id}`);
}
}
