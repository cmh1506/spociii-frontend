import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public apiService: ApiService){}
  loginData = {
    email: '',
    pwd: '',
    name: '',
    description: ''
  }

  login(){
    this.apiService.loginUser(this.loginData)
  }
}
