import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN: string = 'token'

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  get token() {
    return localStorage.getItem(this.TOKEN)
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN)
  }

  registerUser(userRegistrationData: any) {
    this.httpClient.post(environment.baseURL + '/register', userRegistrationData).subscribe((res: any) => {
      this.saveToken(res.token)
    })
  }
  loginUser(loginData: { email: string; pwd: string; name: string; description: string; }) {
    this.httpClient.post<any>(environment.baseURL + '/login', loginData).subscribe((res: any) => {
      this.saveToken(res.token)
      this.router.navigate(['/verpackungs']);

    })
  }

  logout() {
    localStorage.removeItem(this.TOKEN)
    this.router.navigate(['/hone']);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN, token)
  }


}
