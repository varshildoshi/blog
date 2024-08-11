import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BlogEntriesPageble, BlogEntry } from '../model/blog-entry.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllBlogs(page: number, limit: number): Observable<BlogEntriesPageble> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageble>(environment.baseURL + 'blog-entries', { params });
  }

  createBlog(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>(environment.baseURL + 'blog-entries', blogEntry);
  }

  uploadHeaderImageToBlog(formData: FormData): Observable<any> {
    return this.http.post<FormData>(environment.baseURL + 'blog-entries/image/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getBlogByBlogId(blogId: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(`${environment.baseURL}blog-entries/${blogId}`);
  }
}
