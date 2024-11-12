import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { MaterialEffects } from './+state/materials.effects';
import { materialsReducer } from './+state/materials.reducer';
import { UserEffects } from './+state/user.effects';
import { userReducer } from './+state/user.reducer';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { EnergierueckgewinnungFormComponent } from './energierueckgewinnung-form/energierueckgewinnung-form.component';
import { NutzenergieCO2EquivalentFormComponent } from './nutzenergie-co2-equivalent-form/nutzenergie-co2-equivalent-form.component';
import { SharedModule } from './shared/shared.module';
import { TransportmittelFormComponent } from './transportmittel-form/transportmittel-form.component';
import { UserModule } from './user/user.module';
import { VerarbeitungFormComponent } from './verarbeitung-form/verarbeitung-form.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    EnergierueckgewinnungFormComponent,
    NutzenergieCO2EquivalentFormComponent,
    TransportmittelFormComponent,
    VerarbeitungFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    StoreModule.forRoot({router: routerReducer,
      materials: materialsReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx spoc',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([MaterialEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [ApiService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }