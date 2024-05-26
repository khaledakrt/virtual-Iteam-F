import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from '../api/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiURL = 'http://localhost:3002/api/project';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiURL);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiURL, project);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Project>(url, project);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  deleteProjects(ids: string[]): Observable<void> {
    const url = `${this.apiURL}/multi`;
    return this.http.post<void>(url, { ids });
  }

  updateProjectImage(id: string, formData: FormData): Observable<Project> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Project>(url, formData);
  }
  updateProjectWithImage(id: string, formData: FormData): Observable<Project> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Project>(url, formData);
  }
  addProjectWithImage(formData: FormData): Observable<Project> {
    return this.http.post<Project>(this.apiURL, formData);
  }

}
