import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutzenergie-co2-equivalent-form',
  templateUrl: './nutzenergie-co2-equivalent-form.component.html',
  styleUrls: ['./nutzenergie-co2-equivalent-form.component.css']
})
export class NutzenergieCO2EquivalentFormComponent {
  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  nutzenergieCO2EquivalentForm = this.fb.nonNullable.group({
    energietraeger: '',
    co2ProKWh: 0,
    co2ProKJ: 0
  })

  saveNutzenergieCO2Equivalent() {
    this.apiService.saveNutzenergieCO2Equivalent(this.nutzenergieCO2EquivalentForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/users'])
    })
  }
}
