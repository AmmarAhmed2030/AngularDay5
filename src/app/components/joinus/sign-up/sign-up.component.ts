import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Iuser } from '../../../models/iuser';
import { UserService } from '../../../services/user.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  formGroup1: FormGroup;

  // address = [{
  //   'city'
  // }];
  constructor(
    privaterouter: Router,
    private userServ: UserService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup1 = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      address: this.formBuilder.array([]),
      phone: this.formBuilder.array([]),
    });
  }
  get firstName() {
    return this.formGroup1.get('firstName');
  }
  get address() {
    return this.formGroup1.get('address') as FormArray;
  }
  get phone() {
    return this.formGroup1.get('phone') as FormArray;
  }
  get lastName() {
    return this.formGroup1.get('lastName');
  }
  get email() {
    return this.formGroup1.get('email');
  }
  newAddress(): FormGroup {
    return this.formBuilder.group({
      city: '',
      postalCode: '',
      street: '',
    });
  }
  newPhone(): FormGroup {
    return this.formBuilder.group({
      phone: '',
    });
  }
  addAddress() {
    this.address.push(this.newAddress());
  }
  addPhone() {
    this.phone.push(this.newPhone());
  }
  removeAddress(currentIndex: number) {
    this.address.removeAt(currentIndex);
  }
  removePhone(currentIndex: number) {
    this.phone.removeAt(currentIndex);
  }
  user: Iuser = {} as Iuser;
  addUser() {
    this.userServ.createUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
