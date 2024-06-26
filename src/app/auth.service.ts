import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //path = "https://spociii-backend.azurewebsites.net/auth"
  path = environment.path + "/auth"
  //path = "localhost:3000/auth"

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
    this.httpClient.post(this.path + '/register', userRegistrationData).subscribe((res: any) => {
      this.saveToken(res.token)
    })
  }
  loginUser(loginData: { email: string; pwd: string; name: string; description: string; }) {
    this.httpClient.post<any>(this.path + '/login', loginData).subscribe((res: any) => {
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
