import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../api/student';
import { Group } from '../api/group'; // Import the Group interface
import { Teacher } from '../api/teacher';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/student';

  constructor(private http: HttpClient) {}
  // Method to fetch levels from the backend
 
   // Method to fetch levels from the backend
   //getLevels(): Observable<any[]> {
    //return this.http.get<any[]>(`${this.apiUrl}/levels`);
  //}

  // Method to fetch students from the backend
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
  getStudentPhotoUrl(photoFileName: string): string {
    return `http://localhost:3000/${photoFileName}`;

    
  }
  addStudent(formData: FormData): Observable<Student> {
    const photoFileName = formData.get('photo') as string;
    return this.http.post<Student>(`${this.apiUrl}/register`, formData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }
    //return this.http.post<Student>(this.apiUrl+'/register', student);
  //}

  updateStudent(studentId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/students/${studentId}`, formData);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteStudents(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteMany`, { ids });
  }
// Add this method to get a teacher by ID
getStudentById(id: string): Observable<Student> {
  return this.http.get<Student>(`${this.apiUrl}/${id}`);
}


// Add this method to get the student count based on class, system, database, environment, and web server
getStudentCountByClassRoleVms(selectedClass: string, selectedSystem: string, selectedDatabase: string, selectedEnvironment: string, selectedWebServer: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/count`, {
    params: {
      selectedClass,
      selectedSystem,
      selectedDatabase,
      selectedEnvironment,
      selectedWebServer
    }
  });
}

getStudentCountByClass(classe: string, role: string, vms: string): Observable<number> {
  let params = new HttpParams()
    .set('classe', classe)
    .set('role', role)
    .set('vms', vms);
  return this.http.get<number>(`${this.apiUrl}/count`, { params });
}
getStudentsByTeacherCriteria( classe: string, role: string, vms: string): Observable<Student[]> {
  return this.http.get<Student[]>(`${this.apiUrl}/students/group`, {
    params: {
      
      classe,
      role,
      vms
    }
  });
}
getStudentsByGroup(role: string, classe: string, vms: string): Observable<Student[]> {
  const url = `${this.apiUrl}/students/group`;
  const params = { classe,role , vms }; // Query parameters

  return this.http.get<Student[]>(url, { params });
}
// Add the new function to fetch groups
getGroups(): Observable<Group[]> {
  return this.http.get<Group[]>('http://localhost:3000/group/groups');
}


getStudentsByGroupId(groupId: string): Observable<any[]> {
  const url = `${this.apiUrl}/studentsByGroupId/${groupId}`;
  return this.http.get<Student[]>(url);
}
getClasseByStudentId(studentId: string): Observable<Group[]> {
  return this.http.get<Group[]>(`${this.apiUrl}/${studentId}/classe`);
}
getTeachersByStudentGroup(studentId: string): Observable<Teacher[]> {
  return this.http.get<Teacher[]>(`${this.apiUrl}/teachersByStudentId/${studentId}`);
}
getTeachersByStudentGroupId(studentGroupId: string): Observable<Teacher[]> {
  return this.http.get<Teacher[]>(`${this.apiUrl}/teachersByStudentGroupId/${studentGroupId}`);
}
getGroupIdByStudentId(studentId: string): Observable<string> {
  return this.http.get<string>(`${this.apiUrl}/${studentId}/classe`);
}

}

