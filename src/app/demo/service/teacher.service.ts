// src/app/demo/service/teacher.service.ts
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

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl+'/register', teacher);
  }

  updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }

  deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteTeachers(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteMany`, { ids });
  }
// Add this method to get a teacher by ID
getTeacherById(id: string): Observable<Teacher> {
  return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
}
}
