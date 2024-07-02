import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../api/formation'; // Import the Formation interface

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private apiUrl = 'http://localhost:3000/formation'; // Update the URL accordingly

  constructor(private http: HttpClient) {}

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl);
  }

  getFormationById(id: string): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Formation>(url);
  }

  deleteFormation(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  addFormation(formData: FormData): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formData);
  }

  updateFormationWithImage(id: string, formData: FormData): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Formation>(url, formData);
  }

  addFormationWithImage(formData: FormData): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formData);
  }

  deleteFormations(ids: string[]): Observable<void> {
    const url = `${this.apiUrl}/multi`; // Adjust the URL if needed
    const requestBody = {
      formationIds: ids, // Ensure that you are passing an array of valid ObjectId strings
    };
  
    return this.http.post<void>(url, requestBody);
  }
}
