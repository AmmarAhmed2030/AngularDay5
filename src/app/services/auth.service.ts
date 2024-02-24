import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<boolean>;
  isLogged!: boolean;
  constructor() {
    this.user = new BehaviorSubject<boolean>(this.isUserLogged);
  }
  get isUserLogged() {
    return localStorage.getItem('userToken') ? true : false;
  }
  login(userEmail: string, password: string) {
    //backend logic
    let backendToken: string = 'sjefbdfhshjsbddfb';
    localStorage.setItem('userToken', backendToken);
    this.user.next(true);
  }
  logout() {
    localStorage.removeItem('userToken');
    this.user.next(false);
  }
  getUserState(): Observable<boolean> {
    return this.user.asObservable();
  }
}
