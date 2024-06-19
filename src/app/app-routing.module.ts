import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/Dashboard/home.component';
import { LoginPage } from './Views/Login/login-page.component';
import { authGuard } from './Guards/auth.guard';
import { ChangePasswordPage } from './Views/ChangedPassword/ChangePasswordPage.component';

const routes: Routes = [
  { path: 'angularpwa/consultaexames', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard]},
  { path: 'angularpwa/login', component: LoginPage }, 
  { path: 'angularpwa/trocarsenha', component:ChangePasswordPage },  
  { path: '**', redirectTo: 'angularpwa/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
