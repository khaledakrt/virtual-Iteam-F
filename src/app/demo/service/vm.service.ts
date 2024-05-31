import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  private instancesUrl = 'http://localhost:3000/instances';
  private imagesUrl = 'http://localhost:3000/images';
  private flavorsUrl = 'http://localhost:3000/flavors';
  private networksUrl = 'http://localhost:3000/networks';
  private baseUrl = 'http://localhost:3000'; // Update with your backend URL


  constructor(private http: HttpClient) { }

  getInstances(): Observable<any[]> {
    return this.http.get<any[]>(this.instancesUrl);
  }

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.imagesUrl);
  }

  getFlavors(): Observable<any[]> {
    return this.http.get<any[]>(this.flavorsUrl);
  }

  getNetworks(): Observable<any[]> {
    return this.http.get<any[]>(this.networksUrl);
  }
  getConnectedStudent() {
    return this.http.get(`${this.baseUrl}/student/me`);
  }
  


 
}

