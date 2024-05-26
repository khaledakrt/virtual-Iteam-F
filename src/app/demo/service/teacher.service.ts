import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définition du modèle Teacher
interface Teacher {
  _id: string;
  id: string;
  nom: string;
  prenom: string;
  email: string;
  // Ajoutez d'autres propriétés au besoin
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:3000/teacher';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/getteacher`);
  }
}
