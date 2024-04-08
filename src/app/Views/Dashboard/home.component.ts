import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authSessao$:  AuthService) {}
  LocalStorageItens: {tipoUsuario: string | null, sessao: string | null};
  IsPaciente = false;

  ngOnInit(): void {
    this._getLocalStorage();
  }

  private _getLocalStorage(){
    this.LocalStorageItens =  this.authSessao$.getAuthSessao();
    if(this.LocalStorageItens.tipoUsuario == '1')
      this.IsPaciente = true;
  }
}
