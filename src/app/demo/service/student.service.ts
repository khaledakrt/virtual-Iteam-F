import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définition du modèle student
interface Student {
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
export class StudentService {

  private apiUrl = 'http://localhost:3000/student';

  constructor(private http: HttpClient) { }

  getStudents(id): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/${id}`);
  }
}
