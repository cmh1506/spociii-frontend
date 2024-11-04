import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
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

  materialCO2Aufwand: number = 0;
  cradleToGate: number = 0;
  cradleToGrave: number = 0;
  cradleToGraveCO2Gutschrift: number = 0;
  cradleToGraveCO2GutschriftBioFuel: number = 0;
  materialAufwandEnergie: number = 0;
  cradleToGateEnergie: number = 0;
  cradleToGraveEnergie: number = 0;
  cradleToGraveGutschriftEnergie: number = 0;
  cradleToGraveGutschriftBioFuelEnergie: number = 0;

  

  umweltGesamt: Object[] = []

  umweltGesamt$!: Observable<Object[]> 

  displayedColumns: string[] = ['material', 'materialCO2Eq', 'materialEnergie', 'energieAufwandVerarbeitung',
    'verbrennungCo2Eq', 'verbrennungENutzEnergie', 'gutschriftVerbrennungCo2Eq',
    'transportCo2Eq', 'transportEnergie', 'indirectco2Biofuel', 'co2AufwandVerarbeitung',
    'verbrennungBioCo2Eq', 'herstellungBioCo2Eq']

    displayedColumnsGesamt: string[] = ['name', 'co2', 'energie']



  berechnungs$ = this.store.select(selectBerechnungs)
    .pipe(
      tap((bs) => {
        bs.forEach((b) => {
          this.materialCO2Aufwand = this.materialCO2Aufwand + b.materialCO2Eq;
          this.cradleToGate = this.cradleToGate + b.materialCO2Eq + b.transportCo2Eq + b.co2AufwandVerarbeitung;
          this.cradleToGrave = this.cradleToGrave + b.materialCO2Eq + b.transportCo2Eq + b.co2AufwandVerarbeitung + b.verbrennungCo2Eq;
          this.cradleToGraveCO2Gutschrift = this.cradleToGraveCO2Gutschrift + b.materialCO2Eq + b.transportCo2Eq + b.co2AufwandVerarbeitung + b.verbrennungCo2Eq - b.gutschriftVerbrennungCo2Eq;
          this.cradleToGraveCO2GutschriftBioFuel = this.cradleToGraveCO2GutschriftBioFuel + b.materialCO2Eq + b.transportCo2Eq + b.co2AufwandVerarbeitung + b.verbrennungCo2Eq - b.gutschriftVerbrennungCo2Eq + b.indirectco2Biofuel;
          this.materialAufwandEnergie = this.materialAufwandEnergie + b.materialEnergie;
          this.cradleToGateEnergie = this.cradleToGateEnergie + b.materialEnergie + b.transportEnergie + b.energieAufwandVerarbeitung;
          this.cradleToGraveEnergie = this.cradleToGraveEnergie + b.materialEnergie + b.transportEnergie + b.energieAufwandVerarbeitung;
          this.cradleToGraveGutschriftEnergie = this.cradleToGraveGutschriftEnergie + b.materialEnergie + b.transportEnergie + b.energieAufwandVerarbeitung - b.verbrennungENutzEnergie;
        });
        this.umweltGesamt.push(
          {name: "Material:", co2: this.materialCO2Aufwand.toFixed(2), energie: this.materialAufwandEnergie.toFixed(2)},
          {name: "Cradle to Gate:", co2: this.cradleToGate.toFixed(2), energie: this.cradleToGateEnergie.toFixed(2)},
          {name: "Cradle to Grave:", co2: this.cradleToGrave.toFixed(2), energie: this.cradleToGraveEnergie.toFixed(2)},
          {name: "Cradle to Grave mit CO<sub>2</sub>-Gutschrift:", co2: this.cradleToGraveCO2Gutschrift.toFixed(2), energie: this.cradleToGraveGutschriftEnergie.toFixed(2)},
          {name: "Cradle to Grave mit indirektem CO<sub>2</sub>-für Biofuel:", co2: this.cradleToGraveCO2GutschriftBioFuel.toFixed(2), energie: ""},

        );
        this.umweltGesamt$ = of(this.umweltGesamt)
      },

      ))




  ngOnInit(): void {
    this.materialCO2Aufwand = 0;
    this.cradleToGate = 0;
    this.cradleToGrave = 0;
    this.cradleToGraveCO2Gutschrift = 0;
    this.cradleToGraveCO2GutschriftBioFuel = 0;
    this.materialAufwandEnergie = 0;
    this.cradleToGateEnergie = 0;
    this.cradleToGraveEnergie = 0;
    this.cradleToGraveGutschriftEnergie = 0;
    this.cradleToGraveGutschriftBioFuelEnergie = 0;
    this.umweltGesamt = []
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


