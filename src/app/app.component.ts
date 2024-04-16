import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Exames Sphera';
  bodyStyleClass = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authenticated() == false) {
      this.bodyStyleClass = 'not-authenticated';
    }  
  }

  protected authenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
