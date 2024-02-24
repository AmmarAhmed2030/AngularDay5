import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  createUser(user: Iuser): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/users',
      JSON.stringify(user),
      this.myHeaders
    );
  }
}
