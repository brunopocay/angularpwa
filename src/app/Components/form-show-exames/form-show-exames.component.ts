import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiResponse } from '../../Models/ApiResponse';
import { Exame } from '../../Models/Exame';
import { AuthService } from '../../Services/auth.service';
import { DownloadService } from '../../Services/download.service';
import { ExamesService } from '../../Services/exames.service';

@Component({
  selector: 'app-form-show-exames',
  templateUrl: './form-show-exames.component.html',
  styleUrls: ['./form-show-exames.component.css']
})
export class FormShowExamesComponent implements OnInit {
  constructor(private exameService$: ExamesService, private downloadService$: DownloadService, private authService$: AuthService) {}
  localStorageItens: {tipoUsuario:string | null, sessao: string | null }
  Exame:  Exame | undefined;

 
  ngOnInit(): void {
    this._getLocalStorage();
    this._getExames();
  }

  private _getLocalStorage(){
    this.localStorageItens = this.authService$.getAuthSessao();
  }

  private _getExames(){
    if(this.localStorageItens.sessao != undefined) {
      this.exameService$.GetExames(this.localStorageItens.sessao).pipe(
        take(1) 
      ).subscribe((response: ApiResponse<Exame[]>) => {
        if(response.IsSucess)
          this.Exame = response.Data[0];
      });
    }
  }

  protected DownloadPDF(){
    if(this.Exame){
      let nrExameFormatado = this.Exame.NrExame.replace('/','')
      this.downloadService$.DownloadPDF(this.localStorageItens.sessao!, nrExameFormatado)
    }
    else{
      console.log('Erro ao resgatar dados do exame');
    }
  }
  
}
