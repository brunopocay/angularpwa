import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable} from 'rxjs';
import { Users } from '../Models/Users';
import { UserResponse } from '../Models/UserResponse';
import { ApiResponse } from '../Models/ApiResponse';
import { UserChangePassword } from '../Models/UserChangePassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url$ = "user/login";
  private urlchange$ = "user/ChangedPassword";
  private sessao$ = "Sessao";
  private tipousuario$ = "tipoUsuario";
  private trocarsenha$ = "trocarsenha";
  sessao: string | null;
  tipoUsuario: string | null;
  trocarSenha: boolean | null;
  constructor(private _http: HttpClient) { }

  public login(user: Users): Observable<ApiResponse<UserResponse>> {
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this._http.post<ApiResponse<UserResponse>>(`${environment.apiURL}/${this.url$}`, user, httpOptions$)
  }

  public ChangePassword(UserChangePassword:UserChangePassword):Observable<ApiResponse<UserResponse>> {
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this._http.put<ApiResponse<UserResponse>>(`${environment.apiURL}/${this.urlchange$}`, UserChangePassword, httpOptions$)
  }

  public setAuthSessao(user: ApiResponse<UserResponse>){
    localStorage.setItem(this.sessao$, user.Data.Sessao);
    localStorage.setItem(this.tipousuario$, user.Data.TipoUsuario);
    localStorage.setItem(this.trocarsenha$, user.Data.TrocarSenha ? 'true' : 'false');
  }
  
  public getAuthSessao() {
    this.sessao = localStorage.getItem(this.sessao$);
    this.tipoUsuario = localStorage.getItem(this.tipousuario$);
    this.trocarSenha = localStorage.getItem(this.trocarsenha$) == 'true';
    return { sessao: this.sessao, tipoUsuario: this.tipoUsuario, trocarSenha: this.trocarSenha};
  }

  public removeAuthSessao(): void {
    localStorage.removeItem(this.sessao$);
    localStorage.removeItem(this.tipousuario$);
    localStorage.removeItem(this.trocarsenha$);
  }

  public isAuthenticated(): boolean {
    const authSessao$ = this.getAuthSessao();

    return authSessao$ !== null && 
          authSessao$.sessao !== null && 
          authSessao$.tipoUsuario !== null &&
          authSessao$.sessao.trim() !== '' && 
          authSessao$.tipoUsuario.trim() !== '' &&
          !authSessao$.trocarSenha;
  }

}
