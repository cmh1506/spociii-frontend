import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { MaterialFormComponent } from './material/material-form/material-form.component';
import { EnergierueckgewinnungFormComponent } from './energierueckgewinnung-form/energierueckgewinnung-form.component';
import { NutzenergieCO2EquivalentFormComponent } from './nutzenergie-co2-equivalent-form/nutzenergie-co2-equivalent-form.component';
import { TransportmittelFormComponent } from './transportmittel-form/transportmittel-form.component';
import { VerarbeitungFormComponent } from './verarbeitung-form/verarbeitung-form.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './auth.guard';

const routes = [
  
  {
    path: 'material',
    canActivate: [authGuard],
    component: MaterialFormComponent
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
  declarations: [
    AppComponent,
    MaterialFormComponent,
    EnergierueckgewinnungFormComponent,
    NutzenergieCO2EquivalentFormComponent,
    TransportmittelFormComponent,
    VerarbeitungFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,
    MaterialModule,
    UserModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx spoc',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }