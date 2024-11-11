import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from './user/+state/user.reducer';
import { inject } from '@angular/core';
import { selectUserAuthenticated, selectUserToken } from './user/+state/user.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<UserState>);  
  return store.select(selectUserAuthenticated);
};
