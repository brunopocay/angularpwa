import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if(this.UserIsLoggedIn() == true){
      this.router.navigate(['/']);     
    }    
  }

  UserIsLoggedIn():boolean {
    return this.authService.isAuthenticated();
  }
  
}
