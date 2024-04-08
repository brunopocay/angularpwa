import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private http$: HttpClient) { }
  apiUrl = 'exames/Download';

  public DownloadPDF(idSessao: string, nrExame: string): void {
    fetch(`${environment.apiURL}/${this.apiUrl}?sessao=${idSessao}&NrExame=${nrExame}`)
        .then(response => {
            if (response.status === 200) {
                window.open(response.url, '_blank');
            } else {
                Swal.fire('Erro ao fazer download do laudo', 'Tente novamente, se o problema persistir procure o administrador do sistema.', 'error');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer download do laudo:', error);
            Swal.fire('Erro ao fazer download do laudo', 'Tente novamente, se o problema persistir procure o administrador do sistema.', 'error');
        });
  } 

}
