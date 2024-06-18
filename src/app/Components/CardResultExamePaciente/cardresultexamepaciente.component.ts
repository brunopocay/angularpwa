import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Exame } from '../../Models/Exame';
import { AuthService } from '../../Services/auth.service';
import { DownloadService } from '../../Services/download.service';
import { ExamesService } from '../../Services/exames.service';
import { ApiResponseExames } from '../../Models/ApiResponseExames';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-result-exame-paciente',
  templateUrl: './cardresultexamepaciente.component.html',
  styleUrls: ['./cardresultexamepaciente.component.css']
})
export class CardResultExamePacienteComponent implements OnInit {
  constructor(private exameService$: ExamesService, private downloadService$: DownloadService, private authService$: AuthService) {}
  localStorageItens: {tipoUsuario:string | null, sessao: string | null }
  Exame:  Exame | undefined;
  IsLoading: boolean = false;

 
  ngOnInit(): void {
    this._getLocalStorage();
    this._getExames();
  }

  private _getLocalStorage(){
    this.localStorageItens = this.authService$.getAuthSessao();
  }

  private _getExames(){
    if(this.localStorageItens.sessao != undefined) {
      this.IsLoading = true;
      this.exameService$.GetExames(this.localStorageItens.sessao).pipe(
        take(1) 
      ).subscribe((response: ApiResponseExames) => {
        if(response.IsSucess)    
          this.IsLoading = false;  
          this.Exame = response.Data?.Exames[0]
      });
    }
  }

  protected DownloadPDF(){
    Swal.fire({
      title: 'Efetuando download...',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    if(this.Exame){
      let nrExameFormatado = this.Exame.NrExame.replace('/','')
      this.downloadService$.DownloadPDF(this.localStorageItens.sessao!, nrExameFormatado)
    }
    else{
      console.log('Erro ao resgatar dados do exame');
    }
  }
  
}
