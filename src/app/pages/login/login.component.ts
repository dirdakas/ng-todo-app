import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import { UserService } from './../../services/user/user.service';
import { IUserData } from 'src/app/models/user-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.mockLogin();
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  private mockLogin(): void {
    const loggedUser: IUserData = {
      username: this.loginForm.get('username').value,
      email: this.loginForm.get('username').value,
      isAdmin: true
    };

    this.userService.setUserData(loggedUser);
  }
}
