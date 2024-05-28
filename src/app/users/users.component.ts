import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(public apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getUsers();
  }

}
