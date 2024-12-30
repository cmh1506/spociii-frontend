import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { MaterialsState } from '../+state/materials.reducer';
import { MaterialsPageActions } from '../+state/materials.actions';
import { Material } from '../models/material';
import { selectMaterialById } from '../+state/material.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit {
  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<MaterialsState>
  ) { }
  material$ = this.store.select(selectMaterialById)
  material = toSignal(this.material$)
  title: string = "Neues Material anlegen:"

  ngOnInit(): void {
    this.material$.subscribe((m) => {
      if (m) {
        this.materialForm.setValue(m)
        if (m.name) {
          this.title = `Material ${m.name} editieren:`
        }
      }
    })
  }



  materialForm = this.fb.nonNullable.group({
  _id: '0',
  name: '',
  /* a_wert_pef: 0, */
  bioco2verbrennung: 0,
  bio_fuelco2: 0,
  bioco2prod: 0,
  co2recycling: 0,
  co2_deponie: 0,
  co2verbrennung: 0,
  dichte: 0,
  energie_recycling: 0,
  fossiles: 0,
  heizenergie: 0,
  productionCO2: 0,
  prozessenergie: 0,
  r_rate_herstellung: 0,
  recyclat_2te_mal: false,
  recyclierbar: false,
    //recycling_modus: Recyclingverfahren

  })

  saveMaterial() {
    if (this.materialForm.valid) {
      if (this.materialForm.dirty) {
        const material: Material = { ...this.materialForm.value } as Material
        if (material._id === '0') {
          this.store.dispatch(MaterialsPageActions.addMaterial({ material }))
        } else {
          this.store.dispatch(MaterialsPageActions.updateMaterial({ material }))
        }
        
      }
    }
  }
}