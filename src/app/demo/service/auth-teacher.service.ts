import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthTeacherService {

  helper = new JwtHelperService();
role='teacher'
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000/';

  teacherLogin(credentials: any): Observable<any> {
    return this.http.post<any>(this.url + 'teacher/login', credentials);
  }
  teacherRegister(userData: any): Observable<any> {
    return this.http.post<any>(this.url + 'teacher/', userData);
  }
  saveDataTeacher(token: any) {
    console.log('savadata')
    console.log(token)

    let decodedToken: any = this.helper.decodeToken(token);
    console.log('decodedToken')
    console.log(decodedToken)
    localStorage.setItem('token_teacher', token);
    localStorage.setItem('role', this.role);
    localStorage.setItem('id_teacher', decodedToken._id);
    localStorage.setItem('name', decodedToken.name); // Store teacher's name
  }
  
  teacherLoggedIn() {
    let token: any = localStorage.getItem('token_teacher');
    if (!token) {
      return false;
    }
    if (this.helper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
  
}
