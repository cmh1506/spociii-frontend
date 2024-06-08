import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) { }

  displayedColumns: string[] = ['material', 'materialCO2Eq', 'materialEnergie', 'energieAufwandVerarbeitung',
                                'verbrennungCo2Eq', 'verbrennungENutzEnergie', 'gutschriftVerbrennungCo2Eq',
                                'transportCo2Eq', 'transportEnergie', 'indirectco2Biofuel', 'co2AufwandVerarbeitung',
                                'verbrennungBioCo2Eq', 'herstellungBioCo2Eq']


  ngOnInit(): void {
    const verpackung_id = this.route.snapshot.params['_id']
    console.log("Verpackungsid: " + verpackung_id)
    if (!verpackung_id) {
      return
    }
    this.apiService.getVerpackung(verpackung_id).subscribe((verpackung) => {
      if (!verpackung) return
      for (let i = 1; i < verpackung.materialverwendungs.length; i++) {
        this.addMaterialVerwendung(i)
      }
      this.verpackungForm.setValue(verpackung)
    })

  }

  verpackungForm = this.fb.nonNullable.group({
    name: '',
    beschreibung: '',
    materialverwendungs: this.fb.array([this.createMVFormGroup(1)]),
  })


  createMVFormGroup(schicht: number) {

    return this.fb.nonNullable.group({
      layer: schicht,
      materialId:  [''],
      transportmittelId: 0,
      energierueckgewinnungId:  [''],
      verarbeitungId:  [''],
      recyclingverfahrenId:  [''],
      menge: 0,
      flaeche: 0,
      dicke: 0,
      recyclingQuote: 0,
      transportstrecke: 0,
    })
  }

  saveVerpackung() {
    this.apiService.saveVerpackung(this.verpackungForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/verpackungs'])
    })
  }

  addMaterialVerwendung(schicht: any) {
    this.verpackungForm.controls.materialverwendungs.value.forEach(element => {
      if(!element.layer) return
      if(element.layer >= schicht){
        element.layer = element.layer + 1
      }
    });
    this.verpackungForm.controls.materialverwendungs.push(this.createMVFormGroup(schicht))
    this.verpackungForm.controls.materialverwendungs.patchValue(this.verpackungForm.controls.materialverwendungs.value.sort(function (a, b) {
      if (a.layer && b.layer) return a.layer - b.layer
      return 1; // sort in descending order
    }))
  }

  deleteLayer(index: number){
    this.verpackungForm.controls.materialverwendungs.removeAt(index)
    this.verpackungForm.controls.materialverwendungs.value.forEach(element => {
      if(!element.layer) return
      if(element.layer > index){
        element.layer = element.layer -1
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
