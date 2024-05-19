import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient){}
  getMessages() {
    this.httpClient.get('http://localhost:3000/posts').subscribe((res: any) => {
      console.log(res)
    })
  }
}