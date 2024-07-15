import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  /**
   * Set User info
   * @returns Observable<string>
   */
  public setUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return this;
  }

  /**
   * Get User info
   * @returns Observable<string>
   */
  public getUserInfo() {
    return localStorage.getItem('userInfo') &&
      JSON.parse(localStorage.getItem('userInfo'));
  }

  /**
   * Get access token
   * @returns Observable<string>
   */
  public getAccessToken(): string {
    const token: string = localStorage.getItem('access_token');
    return token;
  }

  public getHeaderAdminAccessToken() {
    const token: string = localStorage.getItem('access_token');
    return token;
  }

  /**
   * Set admin access token
   * @returns TokenStorage
   */
  public setAdminAccessToken(token: string): TokenStorage {
    localStorage.setItem('access_token', token);
    return this;
  }


  /**
   * Set access token
   * @returns TokenStorage
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('access_token', token);
    return this;
  }

  /**
   * Set refresh token
   * @returns TokenStorage
   */
  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);
    return this;
  }

  /**
   * SET User Id
   * @returns Observable<string>
   */
  public setIsAdmin(isAdmin: string): TokenStorage {
    localStorage.setItem('isAdmin', isAdmin);
    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.clear();
  }
}
