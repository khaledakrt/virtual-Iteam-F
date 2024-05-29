import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../api/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/student';

  constructor(private http: HttpClient) {}
  // Method to fetch levels from the backend
 
   // Method to fetch levels from the backend
   //getLevels(): Observable<any[]> {
    //return this.http.get<any[]>(`${this.apiUrl}/levels`);
  //}

  // Method to fetch students from the backend
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
  getStudentPhotoUrl(photoFileName: string): string {
    return `http://localhost:3000/${photoFileName}`;
  }
  addStudent(formData: FormData): Observable<Student> {
    const photoFileName = formData.get('photo') as string;
    return this.http.post<Student>(`${this.apiUrl}/register`, formData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }
    //return this.http.post<Student>(this.apiUrl+'/register', student);
  //}

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteStudents(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteMany`, { ids });
  }
// Add this method to get a teacher by ID
getStudentById(id: string): Observable<Student> {
  return this.http.get<Student>(`${this.apiUrl}/${id}`);
}
}
