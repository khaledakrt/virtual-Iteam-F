// blog.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Blog } from "../api/blog";

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private apiUrl = 'http://localhost:3002/api/blog';

  constructor(private http: HttpClient) {}

 
  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogContent(blogId: string): Observable<string> {
    const contentUrl = `${this.apiUrl}/${blogId}`; // Include the blog ID in the URL
    return this.http.get<any>(contentUrl).pipe(
      map(response => response && response.content ? response.content : ''),
    );
  }
  

  saveBlogContent(blog: any): Observable<any> {
    return this.http.post(this.apiUrl, blog);
  }

  updateBlogPost(blogId: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${blogId}`, blog);
  }

  deleteBlogPost(blogId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${blogId}`);
  }
}