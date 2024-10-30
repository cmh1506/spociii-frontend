import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VerpackungsPageActions } from '../+state/verpackungs.actions';
import { selectVerpackungs, selectVerpackungsErrorMessage } from '../+state/verpackungs.selectors';

@Component({
  selector: 'app-verpackung-list',
  templateUrl: './verpackung-list.component.html',
  styleUrls: ['./verpackung-list.component.css']
})
export class VerpackungListComponent implements OnInit{
  constructor(
    private store: Store
  ){}
  verpackungs$ = this.store.select(selectVerpackungs)
  errorMessage$ = this.store.select(selectVerpackungsErrorMessage)

  ngOnInit(): void {
    this.store.dispatch(VerpackungsPageActions.loadVerpackungs())    
  }
  
}
