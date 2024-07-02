import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MailSenderService {
    private apiURL = 'http://localhost:3002/';
    constructor(private htpp:HttpClient) {

   
   }
   sendMail(mail){
    
    return this.htpp.post<any>(`${this.apiURL}send-mail`,mail);
  }
}
