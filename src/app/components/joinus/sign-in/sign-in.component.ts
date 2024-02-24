import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  formgroup1: FormGroup;
  constructor(private auth: AuthService, private router: Router) {
    this.formgroup1 = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  get email() {
    return this.formgroup1.get('email');
  }
  get password() {
    return this.formgroup1.get('password');
  }
  handleLogin() {
    this.auth.login(String(this.email), String(this.password));
    this.router.navigate(['/productparent']);
    this.auth.isLogged = true;
  }
}
