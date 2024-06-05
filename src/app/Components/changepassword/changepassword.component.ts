import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '../../Models/ApiResponse';
import { UserResponse } from '../../Models/UserResponse';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit  {
  formChangePassword:FormGroup;
  fieldTextTypePassword: boolean;
  fieldTextTypeNewPassword: boolean;
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

  ngOnInit(): void {

    this.formChangePassword = this.formbuilder.group({
      User: [''],
      Password: [''],
      NewPassword:['']
    }); 
    
  }

  changePassword(){
    this.inLoading=true;
    const formData = this.formChangePassword.value;  
    console.log(formData);
    this.authService.ChangePassword(formData).pipe(
      catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
      if (error.error) {
        errorMessage = `${error.error.Error}`;
      } else if (error.status) {
        errorMessage = `${error.status}: ${error.error.Error}`;
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
   
  });
  }
  
}
