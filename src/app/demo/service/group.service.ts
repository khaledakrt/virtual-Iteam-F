import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/group/groups';

  constructor(private http: HttpClient) { }

  createGroup(groupData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, groupData);
  }

  getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${groupId}`);
  }
  updateGroup(groupData: any): Observable<any> {
    const groupId = groupData._id; // Assuming _id exists and uniquely identifies the group
    return this.http.put<any>(`${this.apiUrl}/${groupId}`, groupData);
  }

}
