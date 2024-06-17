import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../app/Components/Login/login.component';
import { NavMenuComponent } from '../app/Components/NavMenu/nav-menu.component';
import { HomeComponent } from '../app/Views/Dashboard/home.component';
import { LoginPage } from '../app/Views/Login/login-page.component';
import { AppComponent } from './app.component';
import { CardResultExamePacienteComponent } from './Components/CardResultExamePaciente/cardresultexamepaciente.component';
import { ExamesFilterFormComponent } from './Components/ExamesFilterForm/examesfilterform.component';
import { AuthInterceptor } from './Services/auth.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './Components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';
import { ChangePasswordPage } from './Views/ChangedPassword/ChangePasswordPage.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    LoginPage,
    CardResultExamePacienteComponent,
    ExamesFilterFormComponent,   
    FooterComponent,
    ChangepasswordComponent,
    ChangePasswordPage,
    LoaderComponent
  ],
  imports: [
    DatePipe,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
