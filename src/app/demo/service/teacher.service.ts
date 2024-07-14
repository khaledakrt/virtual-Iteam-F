// src/app/demo/service/teacher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../api/teacher';
import { Group } from '../api/group'; // Import the Group interface

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

  // Add the new function to fetch groups
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('http://localhost:3000/group/groups');
  }
  getLoggedInTeacherClasses(): Observable<string[]> {
    // Assuming you have an API endpoint to fetch the classes for the logged-in teacher
    return this.http.get<string[]>('http://localhost:3000/teacher/classes');
  }
  
  getTeachersByCriteria(role: string, classe: string, vms: string): Observable<any[]> {
    const url = `${this.apiUrl}/teacher/teachers/group`; // L'URL doit être correctement formée ici
    const params = { role, classe, vms };
    return this.http.get<any[]>(url, { params });
  }
  getTeachersByStudentGroup(role: string, classe: string, vms: string): Observable<Teacher[]> {
    const params = new HttpParams()
      .set('role', role)
      .set('classe', classe)
      .set('vms', vms);
    
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachers/group`, { params });
  }
 
  getTeachersByGroup(groupId: string): Observable<any[]> {
    const url = `${this.apiUrl}/teachers?groupId=${groupId}`; // Adjust API endpoint and query parameters as per your backend API
    return this.http.get<any[]>(url);
  }



  // Fetch classes by teacher ID
  getClassesByTeacherId(teacherId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/${teacherId}/classes`);
  }
  getTeachersByGroupId(groupId: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachersByGroupId/${groupId}`);
  }
}
