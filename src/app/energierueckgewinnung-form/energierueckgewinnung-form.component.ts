import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-energierueckgewinnung-form',
  templateUrl: './energierueckgewinnung-form.component.html',
  styleUrls: ['./energierueckgewinnung-form.component.css']
})
export class EnergierueckgewinnungFormComponent {
  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  energierueckgewinnungs$ = this.apiService.energierueckgewinnungs$

  energierueckgewinnungForm = this.fb.nonNullable.group({
    name: '',
    recoveryRate: 0,
    stromanteil: 0,
    thermischerAnteil: 0
  })

  saveEnergierueckgewinnung() {
    this.apiService.saveEnergierueckgewinnung(this.energierueckgewinnungForm.getRawValue()).subscribe({
      //next: () => this.router.navigate(['/users'])
    })
  }


}
