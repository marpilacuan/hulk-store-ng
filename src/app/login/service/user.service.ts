import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/api/user/"


  constructor(private http: HttpClient) {
  }

  login(nickname: String, password: String): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}singIn/${nickname}/${password}`);
  }

  saveNewUser(user: User): Observable<User> {
    console.log('metodo post')
    return this.http.post<User>(`${this.baseUrl}createOrUpdateUser`, user);
  }
}
