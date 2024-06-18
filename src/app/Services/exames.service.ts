import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponseExames } from '../Models/ApiResponseExames';

@Injectable({
  providedIn: 'root'
})
export class ExamesService {
  constructor(private http$: HttpClient) { }

  private urlapi$ = 'exames';

  public GetExames(idSessao: string, dataInicial?: string, dataFinal?: string):Observable<ApiResponseExames>{
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let params = new HttpParams()
      .set('sessao', idSessao)
      .set('Pagina', '1')
      .set('QtPagina', '10')
    if (dataInicial !== undefined) {
      params = params.set('DataInicial', dataInicial);
    }
    if (dataFinal !== undefined) {
      params = params.set('DataFinal', dataFinal);
    }
    return this.http$.get<ApiResponseExames>(`${environment.apiURL}/${this.urlapi$}`, {params:  params, ...httpOptions$});
  }

  public GetExamesWithFilter(
    idSessao: string, 
    page: number | undefined,
    dataInicial?: string, 
    dataFinal?: string, 
    paciente?:string, 
    origem?: string, 
    convenio?: string,
    hospital?: string,
    patologistas?: string,
    medico?: string,
    nrguia?: string
  ):Observable<ApiResponseExames>{
    const httpOptions$ ={headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let pageSize = 20;
    if (page == undefined){
      page = 0;
    }

    let params = new HttpParams().set('sessao', idSessao);
      if (page !== undefined) params = params.set('Pagina', (page + 1).toString());    
      params = params.set('QtPagina', pageSize.toString());     
      if (dataInicial !== undefined) params = params.set('DataInicial', dataInicial);      
      if (dataFinal !== undefined) params = params.set('DataFinal', dataFinal);      
      if (paciente !== undefined) params = params.set('Paciente', paciente);
      if (origem !== undefined) params = params.set('GrupoOrigem', origem);
      if (convenio !== undefined) params = params.set('GrupoConvenio', convenio);
      if (hospital !== undefined) params = params.set('GrupoHospital', hospital);
      if (patologistas !== undefined) params = params.set('GrupoPatologista', patologistas);
      if (medico !== undefined) params = params.set('GrupoMedico', medico);
      if (nrguia !== undefined) params = params.set('Requisicao', nrguia);

    return this.http$.get<ApiResponseExames>(`${environment.apiURL}/${this.urlapi$}`, {params:  params, ...httpOptions$});
  }

}
