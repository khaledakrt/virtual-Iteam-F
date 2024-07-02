import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définition du modèle utilisateur
interface User {
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
export class UserService {

  private apiUrl = 'http://localhost:3000/users-create';

  constructor(private http: HttpClient) { }

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Récupérer un utilisateur par son ID
  getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Enregistrer un nouvel utilisateur
  registerUser(user): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register', user);
  }

  // Mettre à jour un utilisateur
  updateUser(id, user): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
