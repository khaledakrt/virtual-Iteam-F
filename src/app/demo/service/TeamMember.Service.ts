// team-member.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamMember } from '../api/teamMember';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private apiUrl = 'http://localhost:3002/api/team'; // Update the URL accordingly

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.apiUrl);
  }


  deleteTeamMember(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  addTeamMember(formData: FormData): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.apiUrl, formData);
  }

  updateTeamMemberWithImage(id: string, formData: FormData): Observable<TeamMember> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<TeamMember>(url, formData);
  }

  addTeamMemberWithImage(formData: FormData): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.apiUrl, formData);
  }

  deleteTeamMembers(ids: string[]): Observable<void> {
    const url = `${this.apiUrl}/multi`; // Adjust the URL if needed
    const requestBody = {
      memberIds: ids, // Ensure that you are passing an array of valid ObjectId strings
    };
  
    return this.http.post<void>(url, requestBody);
  }

}
