import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginInfo, Token, User } from './models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from './+state/user.reducer';
import { Router } from '@angular/router';
import { selectUserAuthenticated } from './+state/user.selectors';
import { UserPageActions } from './+state/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private store: Store<UserState>,
    private router: Router
  ) { }

  path = environment.path + "/auth"

  registerUser(user: User): Observable<Token> {
    return this.httpClient.post<Token>(this.path + '/register', user)
      .pipe(catchError(this.handleError))
  }

  loginUser(loginInfo: LoginInfo): Observable<Token> {
    return this.httpClient.post<Token>(this.path + '/login', loginInfo)
      .pipe(catchError(this.handleError))
  }

  get isAuthenticated() {
    return this.store.select(selectUserAuthenticated)
  }

  logout() {
    this.store.dispatch(UserPageActions.logoutUser())
    this.router.navigate(['/login']);
  }

  private handleError({ error }: HttpErrorResponse) {
    return throwError(
      () => `${error}`
    );
  }
}
