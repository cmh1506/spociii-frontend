import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Berechnung } from '../../models/berechnung';
import { VerpackungsState } from '../+state/verpackungs.reducer';
import { selectBerechnungs, selectVerpackungById } from '../+state/verpackungs.selectors';
import { VerpackungsPageActions } from '../+state/verpackungs.actions';
import { Verpackung } from 'src/app/models/verpackung';

@Component({
  selector: 'app-verpackung-form',
  templateUrl: './verpackung-form.component.html',
  styleUrls: ['./verpackung-form.component.css']
})
export class VerpackungFormComponent implements OnInit {
  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<VerpackungsState>
  ) {
    //this.materialStore.dispatch(MaterialsPageActions.loadMaterials()) 
  }

  materials$ = this.apiService.materials$
  verpackung!: Verpackung

  displayedColumns: string[] = ['material', 'materialCO2Eq', 'materialEnergie', 'energieAufwandVerarbeitung',
    'verbrennungCo2Eq', 'verbrennungENutzEnergie', 'gutschriftVerbrennungCo2Eq',
    'transportCo2Eq', 'transportEnergie', 'indirectco2Biofuel', 'co2AufwandVerarbeitung',
    'verbrennungBioCo2Eq', 'herstellungBioCo2Eq']

  berechnungs$ = this.store.select(selectBerechnungs)


  ngOnInit(): void {
    /* const verpackung_id = this.route.snapshot.params['_id']
    
    if (!verpackung_id) {
      return
    } */
    //this.store.dispatch(VerpackungsPageActions.loadSelectedVerpackung({_id: verpackung_id}))
    this.store.select(selectVerpackungById).subscribe((verpackung) => {
      if (!verpackung) return
      this.verpackung = verpackung
      for (let i = 1; i < verpackung.materialverwendungs.length; i++) {
        this.addMaterialVerwendung(i)
      }
      this.verpackungForm.setValue(verpackung)
      this.store.dispatch(VerpackungsPageActions.loadBerechnungs({ verpackungId: verpackung._id }))
    })



  }

  verpackungForm = this.fb.nonNullable.group({
    _id: '',
    name: '',
    beschreibung: '',
    materialverwendungs: this.fb.array([this.createMVFormGroup(1)])
  })


  createMVFormGroup(schicht: number) {

    return this.fb.nonNullable.group({
      layer: schicht,
      materialId: [''],
      verarbeitungId: [''],
      recyclingverfahrenId: [''],
      energierueckgewinnungId: [''],
      transportmittelId: [''],
      menge: 0,
      flaeche: 0,
      dicke: 0,
      recyclingQuote: 0,
      transportstrecke: 0,
      openLoop: false
    })
  }

  saveVerpackung() {
    if (this.verpackungForm.valid) {
      if (this.verpackungForm.dirty) {
        const verpackung: Partial<Verpackung> = { ...this.verpackungForm.value, _id: this.verpackung?._id ?? 0 } as Partial<Verpackung>
        if (this.verpackung) {
          this.store.dispatch(VerpackungsPageActions.updateVerpackung({ verpackung }))
        } else {          
          this.store.dispatch(VerpackungsPageActions.addVerpackung({ verpackung }))
        }
      }
    }

    /* this.store.dispatch(VerpackungsPageActions.addVerpackung(this.verpackungForm.getRawValue() ))
    this.apiService.saveVerpackung(this.verpackungForm.getRawValue()).subscribe({
      //next: () => this.router.navigate(['/verpackungs']) 
    })*/
  }

  addMaterialVerwendung(schicht: any) {
    this.verpackungForm.controls.materialverwendungs.value.forEach(element => {
      if (!element.layer) return
      if (element.layer >= schicht) {
        element.layer = element.layer + 1
      }
    });
    this.verpackungForm.controls.materialverwendungs.push(this.createMVFormGroup(schicht))
    this.verpackungForm.controls.materialverwendungs.patchValue(this.verpackungForm.controls.materialverwendungs.value.sort(function (a, b) {
      if (a.layer && b.layer) return a.layer - b.layer
      return 1; // sort in descending order
    }))
  }

  deleteLayer(index: number) {
    this.verpackungForm.controls.materialverwendungs.removeAt(index)
    this.verpackungForm.controls.materialverwendungs.value.forEach(element => {
      if (!element.layer) return
      if (element.layer > index) {
        element.layer = element.layer - 1
      }
    })
    this.verpackungForm.controls.materialverwendungs.patchValue(this.verpackungForm.controls.materialverwendungs.value.sort(function (a, b) {
      if (a.layer && b.layer) return a.layer - b.layer
      return 1; // sort in descending order
    }))
  }

  moveUp(index: number) {
    if (index == 0) return
    var layer = this.verpackungForm.controls.materialverwendungs.value[index].layer
    if (layer) {
      this.verpackungForm.controls.materialverwendungs.value[index].layer = layer - 1
      this.verpackungForm.controls.materialverwendungs.value[index - 1].layer = layer
    }

    this.verpackungForm.controls.materialverwendungs.patchValue(this.verpackungForm.controls.materialverwendungs.value.sort(function (a, b) {
      if (a.layer && b.layer) return a.layer - b.layer
      return 1; // sort in descending order
    }))

  }

  moveDown(index: number) {
    if (index == this.verpackungForm.controls.materialverwendungs.value.length - 1) return
    var layer = this.verpackungForm.controls.materialverwendungs.value[index].layer
    if (layer) {
      this.verpackungForm.controls.materialverwendungs.value[index].layer = layer + 1
      this.verpackungForm.controls.materialverwendungs.value[index + 1].layer = layer
    }

    this.verpackungForm.controls.materialverwendungs.patchValue(this.verpackungForm.controls.materialverwendungs.value.sort(function (a, b) {
      if (a.layer && b.layer) return a.layer - b.layer
      return 1; // sort in descending order
    }))

  }



}
