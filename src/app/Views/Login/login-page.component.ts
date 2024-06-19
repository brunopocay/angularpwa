import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if(this.UserIsLoggedIn() == true){
      this.router.navigate(['/angularpwa/consultaexames']);     
    }    
  }

  UserIsLoggedIn():boolean {
    return this.authService.isAuthenticated();
  }
  
}
