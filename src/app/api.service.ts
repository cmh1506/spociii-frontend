import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {  
  path = "https://spociii-backend.azurewebsites.net/"
  messages = []
  users = []
  constructor(private httpClient: HttpClient){}
  getMessages(userId: string) {
    this.httpClient.get(this.path + '/posts/' + userId).subscribe((res: any) => {
      this.messages = res
    })
  }
  postMessage(message: any) {
    this.httpClient.post(this.path + '/post', message).subscribe((res: any) => {
      console.log(message)
      this.messages = res
    })
  }
  getUsers() {
    this.httpClient.get(this.path + '/users').subscribe((res: any) => {
      this.users = res
    })
  }

  getProfile(id: string) {
    return this.httpClient.get<any>(this.path + '/profile/' + id)
  }

}