import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})

  class AuthGuard {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {        
    const authSessao = this.authService.getAuthSessao();

    if(authSessao && authSessao.sessao && authSessao.tipoUsuario){
      return true;
    }
    else if (authSessao.trocarSenha){
      this.route.navigate(['/trocarsenha']);
      return false;
    } 
    else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}

  export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
    return inject(AuthGuard).canActivate(route, state);
}






