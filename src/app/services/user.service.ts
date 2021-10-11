import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../envirements/environement';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { CountryEnum } from '../enums/countryEnum';

const url = `${environment.apiUrl}/user`;

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` })
  };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  constructor(private http: HttpClient) {
   }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]> (url,httpOptions);
  }

  getCountries(): Observable<CountryEnum[]>{
    const api =`${url}/countries`;
    return this.http.get<CountryEnum[]> (api,httpOptions);
  }

  getUser(id : number):Observable<User>{
    const api =`${url}/${id}`;
    return this.http.get<User>(api,httpOptions);
  }

  addUser(credentials: any):Observable<any>{
    console.log(credentials);
    return this.http.post(url,credentials,httpOptions);
  }

  updateUser(user: User): Observable<any>{
    const urlId = `${url}/${user.id}`;
    return this.http.patch(urlId,user,httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`))
    );
  }
}
