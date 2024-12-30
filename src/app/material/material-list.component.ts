import { Component } from '@angular/core';
import { selectMaterials } from '../+state/material.selectors';
import { MaterialsPageActions } from '../+state/materials.actions';
import { Store } from '@ngrx/store';
import { MaterialsState } from '../+state/materials.reducer';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss'
})
export class MaterialListComponent {
   constructor(
      private store: Store<MaterialsState>
    ){}
  
    materials$ = this.store.select(selectMaterials)
    displayedColumns = ['name', 'bioco2verbrennung', 'bio_fuelco2', 'bioco2prod', 'co2recycling',
      'co2verbrennung', 'dichte', 'energie_recycling', 'fossiles', 'heizenergie', 'productionCO2',
      'prozessenergie', 'r_rate_herstellung', 'recyclat_2te_mal', 'recyclierbar', 'co2_deponie'
    ];
    errorMessage$ = ""/* this.store.select(selectMaterialsErrorMessage) */
  
    ngOnInit(): void {
      //this.store.dispatch(MaterialsPageActions.loadMaterials())    
    }
  
    selectMaterial(_id: string){
      //this.store.dispatch(MaterialsPageActions.select)
    }

}
