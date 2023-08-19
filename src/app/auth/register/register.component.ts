import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
    ) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignUpFormSubmit() {
    if (this.signUpForm.valid) {
    }
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
