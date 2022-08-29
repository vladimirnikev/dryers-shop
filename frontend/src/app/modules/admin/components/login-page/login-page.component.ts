import { map } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { loginUser, loginUserFailed, loginUserSuccess } from 'src/app/store/users/users.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isHide = true;

  isDisable = false;

  sub = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store$: Store,
    private actionsSubj: ActionsSubject,
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['admin/items']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async login() {
    this.isDisable = true;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.store$.dispatch(loginUser({ loginData: { email, password } }));
    this.sub.add(
      this.actionsSubj
        .pipe(
          ofType(loginUserSuccess),
          map(() => {
            this.isDisable = false;
            this.router.navigate(['admin/items']);
          }),
        )
        .subscribe(),
    );

    this.sub.add(
      this.actionsSubj
        .pipe(
          ofType(loginUserFailed),
          map((error) => {
            this.snackBar.open(error.error.message, 'ERROR', { duration: 8000 });
            this.isDisable = false;
          }),
        )
        .subscribe(),
    );
  }
}
