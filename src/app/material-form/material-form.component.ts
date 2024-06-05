import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent {
  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  materialForm = this.fb.nonNullable.group({
    name: '',
    bioCO2Verbrennung: 5555,
    bioFuelCO2: 0,
    bioco2prod: 0,
    co2Recycling: 0,
    co2Verbrennung: 0,
    dichte: 0,
    energieRecycling: 0,
    fossiles: 0,
    heizenergie: 0,
    productionCO2: 0,
    prozessenergie: 0,
    r_rate_herstellung: 0,
    recyclat_2te_mal: false,
    recyclierbar: false,
    co2_deponie: 0,
    //recycling_modus: Recyclingverfahren

  })

  saveMaterial() {
    this.apiService.saveMaterial(this.materialForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/users'])
    })
  }
}
