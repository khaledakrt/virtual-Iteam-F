import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthTeacherService {

  private apiUrl = 'http://localhost:3000'; // Adjust with your backend API URL
  private helper = new JwtHelperService();


  
  constructor(private http: HttpClient) {}

  getCurrentUser(): any {
    let token: any = localStorage.getItem('token_teacher');
    if (token) {
      let decodedToken: any = this.helper.decodeToken(token);
      return {
        id: decodedToken._id,
        name: decodedToken.name,
        role: 'teacher' // Assuming role is predefined as 'teacher'
        // Add more properties as needed
      };
    }
    return null;
  }

  getLoggedInTeacherDetails(): Observable<any> {
    const userId = localStorage.getItem('id_teacher'); // Assuming you store teacher's ID in localStorage
    return this.http.get<any>(`${this.apiUrl}/teacher/${userId}`);
  }

  teacherLogin(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/teacher/login`, credentials);
  }

  teacherRegister(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/teacher/`, userData);
  }

  saveDataTeacher(token: any) {
    let decodedToken: any = this.helper.decodeToken(token);
    localStorage.setItem('token_teacher', token);
    localStorage.setItem('role', 'teacher');
    localStorage.setItem('id_teacher', decodedToken._id);
    localStorage.setItem('name', decodedToken.name);
    
  }

  teacherLoggedIn(): boolean {
    let token: any = localStorage.getItem('token_teacher');
    return !!token && !this.helper.isTokenExpired(token);
  }
}
