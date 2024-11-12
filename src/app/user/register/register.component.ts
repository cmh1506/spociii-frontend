import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserPageActions } from 'src/app/+state/user.actions';
import { UserState } from 'src/app/+state/user.reducer';
import { selectUserErrorMessage } from 'src/app/+state/user.selectors';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
    private store: Store<UserState>
  ){}

  errorMessage$ = this.store.select(selectUserErrorMessage);

  registerForm = this.fb.nonNullable.group({
    email: '',
    pwd: '',
    name: '',
  })

  registerUser() {
    if (this.registerForm.invalid) {
      return
    }
    const user: User = this.registerForm.getRawValue()
    this.store.dispatch(UserPageActions.registerUser({user}))
  }


}
