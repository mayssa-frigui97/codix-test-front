import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../envirements/environement';
import { User } from '../models/user';
import { TokenStorageService } from './token-storage.service';

const url = `${environment.apiUrl}`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isauthenticated: boolean = false;
  public userAuthenticated!: User;
  public token!: string;


  constructor(private http: HttpClient,
    private tokenService: TokenStorageService,
    private router: Router) {
   }

  register(user: User): Observable<any> {
    let api = `${url}/user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  login(credentials: any) {
      return this.http.post<any>(`${url}/auth/login`,
        {
          nickname: credentials.username,
          password: credentials.password
        }
        , httpOptions)
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUser() : User{
    return this.userAuthenticated;
  }

  setToken(token: string) {
    return localStorage.setItem('access_token',token);
  }

  setUser(user: User) {
    this.userAuthenticated = user;
    return this.userAuthenticated;
  }

  isLoggedIn(): boolean {
    let authToken = this.tokenService.getToken();
    return (authToken !== null) ? true : false;
  }

  logout() {
    localStorage.removeItem('user');
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
