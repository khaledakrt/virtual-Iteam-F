// ad-add-users.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdAddUsersService {
  private instancesUrl = 'http://localhost:3000/instances';

  constructor(private http: HttpClient) { }

  getInstances(): Observable<any[]> {
    return this.http.get<any[]>(this.instancesUrl);
  }
}
