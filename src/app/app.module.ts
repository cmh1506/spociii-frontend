import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MessagesComponent } from './messages/messages.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { of } from 'rxjs';
import { VerpackungFormComponent } from './verpackung-form/verpackung-form.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { EnergierueckgewinnungFormComponent } from './energierueckgewinnung-form/energierueckgewinnung-form.component';
import { NutzenergieCO2EquivalentFormComponent } from './nutzenergie-co2-equivalent-form/nutzenergie-co2-equivalent-form.component';
import { TransportmittelFormComponent } from './transportmittel-form/transportmittel-form.component';
import { VerarbeitungFormComponent } from './verarbeitung-form/verarbeitung-form.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { VerpackungListComponent } from './verpackung-list/verpackung-list.component';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select';

const routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'material',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: MaterialFormComponent
  },
  {
    path: 'verpackung/:_id',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerpackungFormComponent
  },
  {
    path: 'verpackung',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerpackungFormComponent
  },
  {
    path: 'verpackungs',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerpackungListComponent
  },
  {
    path: 'energierueckgewinnung',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: EnergierueckgewinnungFormComponent
  },
  {
    path: 'nutzenergieCO2Equivalent',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: NutzenergieCO2EquivalentFormComponent
  },
  {
    path: 'transportmittel',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: TransportmittelFormComponent
  },
  {
    path: 'verarbeitung',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerarbeitungFormComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }]
  },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'posts', component: PostComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    PostComponent,
    VerpackungFormComponent,
    MaterialFormComponent,
    EnergierueckgewinnungFormComponent,
    NutzenergieCO2EquivalentFormComponent,
    TransportmittelFormComponent,
    VerarbeitungFormComponent,
    VerpackungListComponent,
    HomeComponent
  ],
  imports: [
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
    MatSelectModule
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
