import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  constructor(private dbService: NgxIndexedDBService) {}

  /**
   * Set User info
   * @returns Observable<string>
   */
  // public setUserInfo(userInfo) {
  //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
  //   return this;
  // }

  /**
   * Get User info
   * @returns Observable<string>
   */
  // public getUserInfo() {
  //   return localStorage.getItem('userInfo') &&
  //     JSON.parse(localStorage.getItem('userInfo'));
  // }

  /**
   * Get access token
   * @returns Observable<string>
   */
  // public getAccessToken(): string {
  //   const token: string = localStorage.getItem('access_token');
  //   return token;
  // }

  public getAccessToken() {
    const token = this.dbService.getAll('access_token').subscribe(tokens => {
      if (tokens.length) {
        return tokens[0]['token']; // return the first token
      }
      return null;
    });
    // const token: string = localStorage.getItem('access_token');
    return token;
  }

  // public getHeaderAdminAccessToken() {
  //   const token: string = localStorage.getItem('access_token');
  //   return token;
  // }

  /**
   * Set admin access token
   * @returns TokenStorage
   */
  // public setAdminAccessToken(token: string): TokenStorage {
  //   localStorage.setItem('access_token', token);
  //   return this;
  // }


  /**
   * Set access token
   * @returns TokenStorage
   */
  // public setAccessToken(token: string): TokenStorage {
  //   localStorage.setItem('access_token', token);
  //   return this;
  // }

  public setAccessToken(token: string): TokenStorage {
    this.dbService.add('access_token', { token });
    // localStorage.setItem('access_token', token);
    return this;
  }

  /**
   * Set refresh token
   * @returns TokenStorage
   */
  // public setRefreshToken(token: string): TokenStorage {
  //   localStorage.setItem('refreshToken', token);
  //   return this;
  // }

  /**
   * SET User Id
   * @returns Observable<string>
   */
  // public setIsAdmin(isAdmin: string): TokenStorage {
  //   localStorage.setItem('isAdmin', isAdmin);
  //   return this;
  // }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.clear();
  }
}
