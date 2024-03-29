import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { loginUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') form!: NgForm;

  loginLoading: Observable<boolean>;
  loginError: Observable<null | LoginError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.loginLoading = store.select(state => state.users.loginLoading);
    this.loginError = store.select(state => state.users.loginError);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(loginUserRequest({ userData: this.form.value }));
  }

}
