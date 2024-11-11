import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from './user/+state/user.reducer';
import { selectUserAuthenticated, selectUserToken } from './user/+state/user.selectors';
import { UserPageActions } from './user/+state/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = environment.path + "/auth"
  //path = "localhost:3000/auth"

  TOKEN: string = 'token'

  constructor(private store: Store<UserState>,
    private router: Router
  ) { }
  get isAuthenticated() {
    return this.store.select(selectUserAuthenticated)
  }

  logout() {
    this.store.dispatch(UserPageActions.logoutUser())
    this.router.navigate(['/login']);
  }

  

}
