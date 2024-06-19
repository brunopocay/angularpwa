import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private route: Router) {}
  apiUrl = 'exames/Download';

  public DownloadPDF(idSessao: string, nrExame: string): void {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
      controller.abort(); 
    }, 5000);

    fetch(`${environment.apiURL}/${this.apiUrl}?sessao=${idSessao}&NrExame=${nrExame}`,{ signal })
      .then((response) => {
        if (response.ok) {
          window.location.href = response.url;
          Swal.fire({
            title: 'Download realizado com sucesso',
            icon: 'success',
            showConfirmButton: true,
          });
        } else if (response.status === 403 || response.status === 401) {
          Swal.fire(
            'Sessão expirada',
            'Você será redirecionado para a tela de login novamente.',
            'error'
          ).then(() => {
            this.route.navigate(['/angularpwa/login']);
          });
        } else {
          Swal.fire(
            'Erro ao fazer download do laudo',
            'Tente novamente, se o problema persistir procure o administrador do sistema.',
            'error'
          );
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer download do laudo:', error);
        Swal.fire(
          'Erro ao fazer download do laudo',
          'Tente novamente, se o problema persistir procure o administrador do sistema.',
          'error'
        );
      });
  }
}
