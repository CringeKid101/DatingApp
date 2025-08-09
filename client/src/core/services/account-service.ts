import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/";
  currentUser = signal<User | null>(null);

  login(creds: any) {
    return this.http.post<User>(this.baseUrl + "account/login", creds).pipe(
      tap(user => {
        console.log(user);
        this.setCurrentUser(user);
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(this.currentUser()));
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + "account/register", creds).pipe(
      tap(user =>
        this.setCurrentUser(user)
      )
    );
  }
}
