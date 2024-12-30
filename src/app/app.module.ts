import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialEffects } from './+state/materials.effects';
import { materialsReducer } from './+state/materials.reducer';
import { UserEffects } from './+state/user.effects';
import { userReducer } from './+state/user.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { UserService } from './user.service';
import { UserModule } from './user/user.module';
import { environment } from '../environments/environment.prod';
import { ApiService } from './api.service';
import { VerarbeitungEffects } from './+state/verarbeitungs.effects';
import { verarbeitungsReducer } from './+state/verarbeitungs.reducer';
import { energierueckgewinnungsReducer } from './+state/energierueckgewinnungs.reducer';
import { EnergierueckgewinnungEffects } from './+state/energierueckgewinnungs.effects';
import { TransportmittelEffects } from './+state/transportmittels.effects';
import { transportmittelsReducer } from './+state/transportmittels.reducer';
import { MaterialFormComponent } from './material/material-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialTabelComponent } from './material-tabel/material-tabel.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    MaterialTabelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    StoreModule.forRoot({
      router: routerReducer,
      materials: materialsReducer,
      verarbeitungs: verarbeitungsReducer,
      energierueckgewinnungs: energierueckgewinnungsReducer,
      transportmittels: transportmittelsReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx spoc',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([MaterialEffects, UserEffects, VerarbeitungEffects, EnergierueckgewinnungEffects, TransportmittelEffects]),
    StoreRouterConnectingModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [ApiService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }