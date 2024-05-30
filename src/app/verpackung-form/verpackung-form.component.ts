import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-verpackung-form',
  templateUrl: './verpackung-form.component.html',
  styleUrls: ['./verpackung-form.component.css']
})
export class VerpackungFormComponent {
  constructor(public apiService: ApiService) { }

  verpackungData = {
    name: '',
    beschreibung: ''
  }

  save() {
    this.apiService.createVerpackung(this.verpackungData)
  }

}
