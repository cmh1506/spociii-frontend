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
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
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

const routes = [
  { path: 'verpackung', component: VerpackungFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verpackung', component: VerpackungFormComponent },
  { path: 'login', component: LoginComponent },
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
    VerpackungFormComponent
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
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
