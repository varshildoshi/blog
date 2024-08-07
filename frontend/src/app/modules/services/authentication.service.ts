import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, retry, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorage } from './token-storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
    public tokenStorage: TokenStorage,
  ) {
  }

  handleError(error) {
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

  clearStorage() {
    localStorage.removeItem('user_data');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  checkUserLogin() {
    const checkUser = localStorage.getItem('user_data');
    if (checkUser) {
      // console.log(checkUser);
      this.router.navigate(['/dashboard']);
    } else {
      // console.log('checkUser');
      this.clearStorage();
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
  * Check, if user already authorized.
  * @description Should return Observable with true or false values
  * @returns Observable<boolean>
  * @memberOf AuthService
  */
  public isAuthorized(): Observable<boolean> {
    const accessToken = this.tokenStorage.getAccessToken();
    const auth: any = {
      isLoggedIn: !accessToken ? false : true
    };
    return of(auth);
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns Observable<boolean>
   * @memberOf AuthService
   */
  public isAuthorizedAdmin(): Observable<boolean> {
    const userId = this.tokenStorage.getHeaderAdminAccessToken();
    return of(!userId ? false : true);
  }

  /**
   * Submit register request
   * @param data: user entered data
   * @returns Observable<any>
   */
  public register(data: any): Observable<any> {
    return this.http.post(environment.baseURL + 'users', data).pipe(
      tap(n => this.saveAccessData(n))
    );
  }

  /**
   * Submit login request
   * @param Credential: credential
   * @returns Observable<any>
   */
  public login(payload: any): Observable<any> {
    return this.http.post(environment.baseURL + 'users/login', payload).pipe(
      tap(n => this.saveAccessData(n))
    );
  }

  /**
   * Submit login request
   * @param Credential: credential
   * @returns Observable<any>
   */
  public adminLogin(credential: any): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/login', credential).pipe(
      tap(n => this.saveAccessDataAdmin(n))
    );
  }

  /**
   * Update User Information
   * @param Credential: credential
   * @returns Observable<any>
   */
  public getUserDetails() {
    return this.http.get(environment.baseURL + 'auth/userdetails');
  }

  /**
   * Update User Information
   * @param Credential: credential
   * @returns Observable<any>
   */
  public updateUserDetails(credential: any): Observable<any> {
    return this.http.patch(environment.baseURL + 'auth/userdetails', credential);
  }

  /**
   * Save access data in the storage
   * @param AccessData: data
   */
  public saveAccessDataAdmin(accessData) {
    if (typeof accessData !== 'undefined') {
      this.tokenStorage
        // .setUserInfo(accessData.data.admin)
        .setAdminAccessToken(accessData.data.token)
        .setRefreshToken('')
        .setIsAdmin('true')
    }
    return this;
  }

  /**
   * Save access data in the storage
   * @param AccessData: data
   */
  public saveAccessData(accessData) {
    if (typeof accessData !== 'undefined') {
      this.tokenStorage
        // .setUserInfo(accessData.data.user)
        .setAccessToken(accessData.access_token)
        .setRefreshToken('')
        .setIsAdmin('false')
    }
    return this;
  }

  /**
   * Get access token from localstorage
   */
  getToken() {
    return localStorage.getItem("access_token");
  }
}
