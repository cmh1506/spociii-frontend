import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-verarbeitung-form',
  templateUrl: './verarbeitung-form.component.html',
  styleUrls: ['./verarbeitung-form.component.css']
})
export class VerarbeitungFormComponent {
  
  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  

  verarbeitungForm = this.fb.nonNullable.group({
    name: '',
    strom: 0,
    waerme: 0,
  }) 

  saveVerarbeitung() {
    this.apiService.saveVerarbeitung(this.verarbeitungForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/users'])
    })
  }  

  


}
