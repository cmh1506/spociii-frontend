import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { 
    path: 'verpackung',
    loadChildren: () =>
      import('./verpackung/verpackung.module').then(m => m.VerpackungModule)
  },
  { 
    path: 'material',
    loadChildren: () =>
      import('./material/material.module').then(m => m.MaterialModule)
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
