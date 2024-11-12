import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { EnergierueckgewinnungFormComponent } from './energierueckgewinnung-form/energierueckgewinnung-form.component';
import { NutzenergieCO2EquivalentFormComponent } from './nutzenergie-co2-equivalent-form/nutzenergie-co2-equivalent-form.component';
import { TransportmittelFormComponent } from './transportmittel-form/transportmittel-form.component';
import { VerarbeitungFormComponent } from './verarbeitung-form/verarbeitung-form.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';



const routes: Routes = [
  { 
    path: 'material',
    loadChildren: () =>
      import('./material/material.module').then(m => m.MaterialModule)
  },  
  {
    path: 'energierueckgewinnung',
    canActivate: [authGuard],
    component: EnergierueckgewinnungFormComponent
  },
  {
    path: 'nutzenergieCO2Equivalent',
    canActivate: [authGuard],
    component: NutzenergieCO2EquivalentFormComponent
  },
  {
    path: 'transportmittel',
    canActivate: [authGuard],
    component: TransportmittelFormComponent
  },
  { 
    path: 'verpackung',
    loadChildren: () =>
      import('./verpackung/verpackung.module').then(m => m.VerpackungModule)
  },
  {
    path: 'verarbeitung',
    canActivate: [authGuard],
    component: VerarbeitungFormComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
