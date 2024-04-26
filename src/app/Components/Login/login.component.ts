import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { UserResponse } from '../../Models/UserResponse';
import { MatDialog } from '@angular/material/dialog';
import { TermosDeUsoComponent } from '../termos-de-uso/termos-de-uso.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  showSpan = false;
  responseError = false;
  responseMessageError = '';
  fieldTextType: boolean;

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      User: [''],
      Password: [''],
      checkterms: [false, Validators.requiredTrue]
    });
    this._CheckTermsControl();
  }

  private _CheckTermsControl(): void {
    const checktermsControl = this.loginForm.get('checkterms');
    
    checktermsControl?.valueChanges.subscribe(() => {
      if (checktermsControl.value) {
        checktermsControl.markAsTouched();
      }
    });
  }

  checkTermsAndConditions(): void {
    const dialogRef = this.dialog.open(TermosDeUsoComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loginForm.get('checkterms')!.setValue(true);
      } else if (result == undefined) {
        this.loginForm.get('checkterms')!.setValue(false);
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {
    if(this.loginForm.valid){
        const user = this.loginForm.get('User');
        user?.setValue(user.value.toLowerCase());
        const formData = this.loginForm.value;
        this.showSpan = true;      
        this.authService.login(formData).pipe(
          catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
          if (error.error) {
            errorMessage = `${error.error.Error}`;
          } else if (error.status) {
            errorMessage = `${error.status}: ${error.error.Error}`;
          }      
          this.showSpan = false;
          this.responseError = true;
          this.responseMessageError = errorMessage;
          
          setTimeout(() => {
            this.responseError = false;
          }, 3000);
          
          return throwError(() => error);
        })
      ).subscribe((response: ApiResponse<UserResponse>) => {
        this.showSpan = false;
        this.responseError = false;
        this.authService.setAuthSessao(response);
        this.router.navigate(['/consultaexames']);
      });
    }
  }
  
}
