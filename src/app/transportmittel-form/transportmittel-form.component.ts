import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transportmittel-form',
  templateUrl: './transportmittel-form.component.html',
  styleUrls: ['./transportmittel-form.component.css']
})
export class TransportmittelFormComponent {

  constructor(public apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  transportmittelForm = this.fb.nonNullable.group({
    name: '',
    stromanteil: 0,
    energie: 0,
  })

  saveTransportmittel() {
    this.apiService.saveTransportmittel(this.transportmittelForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/users'])
    })
  }
}
