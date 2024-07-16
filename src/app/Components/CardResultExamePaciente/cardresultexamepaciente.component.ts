import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('video', { static: false }) videoElement!: ElementRef;
  Exame:  Exame | undefined;
  IsLoading: boolean = false;
  mediaRecorder: any;
  recordedChunks: Blob[] = [];

 
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

  
  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.videoElement.nativeElement;
      video.srcObject = stream;
      video.play();

      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
    } catch (error) {
      console.error('Erro ao acessar a câmera: ', error);
    }
  }

  startRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'recording') {
      this.recordedChunks = [];
      this.mediaRecorder.start();
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(videoBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = videoURL;
        a.download = 'recorded_video.webm';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(videoURL);
      };
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