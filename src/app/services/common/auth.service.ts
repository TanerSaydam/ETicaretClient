import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _jwt: JwtHelperService
  ) { }

  identityCheck(){
    const token = localStorage.getItem("accessToken");

    let expired: boolean;
    try {
      expired = this._jwt.isTokenExpired(token);
    } catch (error) {
      expired: true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;