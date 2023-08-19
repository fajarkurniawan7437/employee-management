import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly coreService: CoreService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const isAuthenticated = this.authService.authenticate(email, password);

      if (isAuthenticated) {
        this.coreService.openSnackBar('Login successful!', 'Ok');
        this.router.navigate(['/employee-list']);
      } else {
        this.coreService.openSnackBar('Login failed. Please check your email and password.', 'Error');
      }
    } else {
      this.coreService.openSnackBar('Please fill in valid login details.', 'Error');
    }
  }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
