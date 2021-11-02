import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isHide = true
  isDisable = false
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['admin/items'])
    }
  }

  async login() {
    this.isDisable = true
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    try {
      await this.authService.login({ email, password })
      this.isDisable = false
      this.router.navigate(['admin/items'])
    } catch (error) {
      this._snackBar.open(error.error.message, error.error.statusCode, { duration: 8000 })
      this.isDisable = false
    }
  }
}
