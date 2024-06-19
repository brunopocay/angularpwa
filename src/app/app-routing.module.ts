import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/Dashboard/home.component';
import { LoginPage } from './Views/Login/login-page.component';
import { authGuard } from './Guards/auth.guard';
import { ChangePasswordPage } from './Views/ChangedPassword/ChangePasswordPage.component';

const routes: Routes = [
  { path: 'consultaexames', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard]},
  { path: 'login', component: LoginPage }, 
  { path: 'trocarsenha', component:ChangePasswordPage },  
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
