import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthStudentService {

  helper = new JwtHelperService();
  role='student'
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000/';

  studentLogin(credentials: any): Observable<any> {
    return this.http.post<any>(this.url + 'student/login', credentials);
  }
  studentRegister(userData: any): Observable<any> {
    return this.http.post<any>(this.url + 'student/', userData);
  }
  saveDataStudent(token: any) {
    let decodedToken: any = this.helper.decodeToken(token);
    localStorage.setItem('token_student', token);
    localStorage.setItem('role', this.role);
    localStorage.setItem('id_student', decodedToken._id);
    localStorage.setItem('name', decodedToken.name); // Store student's name
  }
  
  studentLoggedIn() {
    let token: any = localStorage.getItem('token_student');
    if (!token) {
      return false;
    }
    if (this.helper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
  
}
