// src/app/demo/service/teacher.service.ts
//teacher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../api/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000/teacher';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }
  getTeacherPhotoUrl(photoFileName: string): string {
    return `http://localhost:3000/${photoFileName}`;
  }
  addTeacher(formData: FormData): Observable<Teacher> {
    const photoFileName = formData.get('photo') as string;
    // Remove the line below, as it's incorrect
    // const photoFilePath = `http://localhost:3000/${photoFileName}`;
    // formData.set('photo', photoFilePath);
    return this.http.post<Teacher>(`${this.apiUrl}/register`, formData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }

  updateTeacher(id: string, formData: FormData): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, formData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }

  deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteTeachers(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteMany`, { ids });
  }

  getTeacherById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }
}
