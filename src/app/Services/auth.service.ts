import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../Models/Users';
import { UserResponse } from '../Models/UserResponse';
import { ApiResponse } from '../Models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url$ = "user/login";
  private sessao$ = "Sessao";
  private tipousuario$ = "tipoUsuario";
  sessao: string | null;
  tipoUsuario: string | null;
  constructor(private _http: HttpClient) { }

  public login(user: Users): Observable<ApiResponse<UserResponse>> {
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this._http.post<ApiResponse<UserResponse>>(`${environment.apiURL}/${this.url$}`, user, httpOptions$)
  }

  public setAuthSessao(user: ApiResponse<UserResponse>): void {
    localStorage.setItem(this.sessao$, user.Data.Sessao);
    localStorage.setItem(this.tipousuario$, user.Data.TipoUsuario);
  }
  
  public getAuthSessao() {
    this.sessao = localStorage.getItem(this.sessao$);
    this.tipoUsuario = localStorage.getItem(this.tipousuario$);
    return { sessao: this.sessao, tipoUsuario: this.tipoUsuario};
  }

  public removeAuthSessao(): void {
    localStorage.removeItem(this.sessao$);
    localStorage.removeItem(this.tipousuario$);
  }

  public isAuthenticated(): boolean {
    const authSessao$ = this.getAuthSessao();

    return authSessao$ !== null && 
          authSessao$.sessao !== null && 
          authSessao$.tipoUsuario !== null &&
          authSessao$.sessao.trim() !== '' && 
          authSessao$.tipoUsuario.trim() !== '';
  }

}
