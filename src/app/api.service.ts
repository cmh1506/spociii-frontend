import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loginUser(loginData: { email: string; pwd: string; name: string; description: string; }) {
    console.log(loginData)
  }
  messages = []
  constructor(private httpClient: HttpClient){}
  getMessages() {
    this.httpClient.get('http://localhost:3000/posts').subscribe((res: any) => {
      this.messages = res
      console.log(res)
    })
  }
  sendUserRegistration(userRegistrationData: any) {
    this.httpClient.post('http://localhost:3000/register', userRegistrationData).subscribe((res: any) => {
      
    })
  }

}