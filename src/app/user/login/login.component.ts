import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginInfo } from 'src/app/models/user';
import { UserState } from 'src/app/+state/user.reducer';
import { selectUserErrorMessage } from 'src/app/+state/user.selectors';
import { UserPageActions } from 'src/app/+state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,
    private store: Store<UserState>
  ){}

  errorMessage$ = this.store.select(selectUserErrorMessage);

  loginForm = this.fb.nonNullable.group({
    email: '',
    pwd: '',
  })

  loginUser() {
    if (this.loginForm.invalid) {
      return
    }
    const info: LoginInfo = this.loginForm.getRawValue()
    this.store.dispatch(UserPageActions.loginUser({info}))

  }


}
