import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  handleError(error) {
    console.log(error);
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = { message: error.error.message };
    } else {
      // server-side error
      errorMessage = { status: error.status, message: error.error.message };
    }
    return throwError(errorMessage);
  }

  getAllUsers(page: number, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(environment.baseURL + 'users', { params }).pipe(
      map((userData: any) => userData),
      catchError(err => throwError(err))
    );
  }

  getUsersBySearchFilter(page: number, size: number, username: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get(environment.baseURL + 'users', { params }).pipe(
      map((userData: any) => userData),
      catchError(err => throwError(err))
    );
  }

  getUserById(id): Observable<any> {
    return this.http.get(environment.baseURL + `users/${id}`).pipe(
      map((user: any) => user)
    )
  }

  updateUser(payload): Observable<any> {
    return this.http.put(environment.baseURL + `users/${payload.id}`, payload);
  }

  uploadProfile(image): Observable<any> {
    let formParams = new FormData();
    formParams.append('file', image)
    return this.http.post(environment.baseURL + 'users/upload', formParams);
  }
}
