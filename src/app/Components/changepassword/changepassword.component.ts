import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import {  Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '../../Models/ApiResponse';
import { UserResponse } from '../../Models/UserResponse';
import { FormValidators } from '../../Helpers/FormValidators';
import { UserChangePassword } from '../../Models/UserChangePassword';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit  {
  formChangePassword:FormGroup;
  fieldTextTypePassword: boolean;
  fieldTextTypeNewPassword: boolean;
  fieldTextTypeRepeatPassword: boolean;
  inLoading:boolean=false;

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router:Router
  ) {}

  responseError = false;
  responseMessageError = '';

  toggleFieldTextType() {
    this.fieldTextTypePassword = !this.fieldTextTypePassword;
  }
  toggleFieldNewPassTextType() {
    this.fieldTextTypeNewPassword = !this.fieldTextTypeNewPassword;
  }
  toggleFieldRepeatPassTextType() {
    this.fieldTextTypeRepeatPassword = !this.fieldTextTypeRepeatPassword;
  }

  ngOnInit(): void {
    const user = localStorage.getItem('usuario');
    this.formChangePassword = this.formbuilder.group({
      User: [user],
      OldPassword: ['', Validators.required],
      NewPassword:['', Validators.required],
      RepeatPassword: [null, Validators.required, FormValidators.EqualsTo('NewPassword')]
    }); 
  }

  changePassword(){
    this.inLoading = true;
    const formData = this.formChangePassword.value;  
    const userChangePass: UserChangePassword = {
      User: formData.User,
      Password: formData.OldPassword,
      NewPassword: formData.NewPassword
    };
    this.authService.ChangePassword(userChangePass).pipe(
      catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
      if (error.error) {
        errorMessage = `${error.error}`;
      }
      this.inLoading = false;
      this.responseError = true;
      this.responseMessageError = errorMessage;
      
      setTimeout(() => {
        this.responseError = false;
      }, 3000);
      
      return throwError(() => error);
    })
  ).subscribe((response: ApiResponse<UserResponse>) => {
    this.inLoading = false;
    this.authService.setAuthSessao(response);
    this.router.navigate(['/consultaexames']); 
    localStorage.removeItem('usuario');
  });
  }
  
}
