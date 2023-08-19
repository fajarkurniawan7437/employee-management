import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor() { }

  authenticate(email: string, password: string): boolean {
    return email === 'admin@gmail.com' && password === '123456';
  }
}
