import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Import des opérateurs catchError et tap depuis RxJS

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  private apiUrl = 'http://localhost:3000/api/instances'; // Assurez-vous que cette URL est correcte
  private securityGroupAddedKey = 'securityGroupAdded';
  private floatingIpAddedKey = 'floatingIpAdded';

  constructor(private http: HttpClient) { 
    this.securityGroupAdded = localStorage.getItem(this.securityGroupAddedKey) || '';
    this.floatingIpAdded = localStorage.getItem(this.floatingIpAddedKey) || '';

  }
  private securityGroupAdded: string = '';
  private floatingIpAdded: string = '';


  getInstancesByStudentId(studentId: string): Observable<any[]> {
    // Assurez-vous que `studentId` est bien l'ID de l'étudiant connecté
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }
  startInstance(instanceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/start/${instanceId}`, {});
  }

  stopInstance(instanceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/stop/${instanceId}`, {});
  }
  assignSecurityGroup(instanceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${instanceId}/assignSecurityGroup`, {}).pipe(
      tap(() => this.updateSecurityGroupAdded('Groupe1')), // Met à jour la valeur dans le service et localStorage
      catchError((error) => {
        console.error('Erreur lors de l\'assignation du groupe de sécurité:', error);
        throw error;
      })
    );
  }

  assignFloatingIp(instanceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${instanceId}/assignFloatingIp`, {}).pipe(
      tap(() => this.floatingIpAdded = 'IP flottante ajoutée'), // Mettre à jour la propriété floatingIpAdded
      catchError((error) => {
        console.error('Erreur lors de l\'assignation de l\'IP flottante:', error);
        throw error;
      })
    );
  }

  getSecurityGroupAdded(): string {
    return this.securityGroupAdded;
  }

  getFloatingIpAdded(): string {
    return this.floatingIpAdded;
  }
  private updateSecurityGroupAdded(value: string) {
    this.securityGroupAdded = value;
    localStorage.setItem(this.securityGroupAddedKey, value);
  }

  private updateFloatingIpAdded(value: string) {
    this.floatingIpAdded = value;
    localStorage.setItem(this.floatingIpAddedKey, value);
  }
}
