import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-verpackung-list',
  templateUrl: './verpackung-list.component.html',
  styleUrls: ['./verpackung-list.component.css']
})
export class VerpackungListComponent {
  constructor(public apiService: ApiService){}
}
