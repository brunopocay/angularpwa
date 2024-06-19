import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './Nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  
  constructor(private authGuard$: AuthService, private route$: Router) { }

  UserIsLoggedIn():boolean {
    return this.authGuard$.isAuthenticated();
  }

  public _logout(){
    Swal.fire({
      text: 'Deseja realmente sair?',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
      showCloseButton: true,
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed){
        this.route$.navigate(['/login']);
        this.authGuard$.removeAuthSessao();
      }
    })
  }
  
}
