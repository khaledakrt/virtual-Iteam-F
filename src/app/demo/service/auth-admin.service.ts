import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  role='admin'
helper = new  JwtHelperService(); 

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:3000/';
   
 
  login(credentials: { email: string, password: string }): Observable<any> {
    console.log(credentials)
    return this.http.post<any>(`${this.url}admin/login`, credentials);
  }
  saveDataAdmin(token:any){
    let decodeToken = this.helper.decodeToken(token)
console.log(decodeToken)
    localStorage.setItem('token_admin',token);
    localStorage.setItem('role', this.role);
        localStorage.setItem('nom',decodeToken.nom)
  }

  adminLoggedIn(){
    let token:any=localStorage.getItem('token_admin');
    if (!token){
      return false
    }
    if(this.helper.isTokenExpired(token)){
   return false
    }
    return true 
  }
  users:any[] = [];
 

 

}