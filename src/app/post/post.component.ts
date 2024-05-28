import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  postMsg: any = "Fuck it."

  constructor(public apiService: ApiService) { }

  post() {
    this.apiService.postMessage({msg: this.postMsg})
  }
}
