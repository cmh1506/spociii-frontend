import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verpackung-form',
  templateUrl: './verpackung-form.component.html',
  styleUrls: ['./verpackung-form.component.css']
})
export class VerpackungFormComponent implements OnInit{
  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    console.log("In Oninit")
    const verpackung_id = this.route.snapshot.params['_id']
    console.log(verpackung_id)
    this.apiService.getVerpackung(verpackung_id).subscribe((verpackung) => {
      if (!verpackung) return
      for (let i = 1; i < verpackung.materialverwendungs.length; i++) {
        this.addMaterialVerwendung()    
      }
      this.verpackungForm.setValue(verpackung)
    })
    
  }

  verpackungForm = this.fb.nonNullable.group({
    name: '',
    beschreibung: '',
    materialverwendungs: this.fb.array([this.createMVFormGroup()]),
  })

  
  createMVFormGroup() {
    return this.fb.nonNullable.group({
      materialId: 0,
      verarbeitungId: 0,
      recyclingverfahrenId: 0,
      energierueckgewinnungId: 0,
      transportmittelId: 0,
      energierueckgewinnung: '',
      material: '',
      verarbeitung: '',
      recyclingverfahren: '',
      transportmittel: '',
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

  addMaterialVerwendung() {
    this.verpackungForm.controls.materialverwendungs.push(this.createMVFormGroup())  
  }

  
}
