import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from 'src/app/demo/api/group';


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
  getGroupById(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${groupId}`);
  }
  getGroupsForTeacher(teacherId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }
  
  
}
