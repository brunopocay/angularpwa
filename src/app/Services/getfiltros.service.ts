import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { FilterResponse } from '../Models/FilterResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetfiltrosService {
  constructor(private http$: HttpClient) { }

  public GetOrigem(idSessao: string): Observable<ApiResponse<FilterResponse[]>>{
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let params = new HttpParams()
      .set('sessao', idSessao)
    return this.http$.get<ApiResponse<FilterResponse[]>>(`${environment.apiURL}/origem`, {params:  params, ...httpOptions$});
  }

  public GetHospital(idSessao: string): Observable<ApiResponse<FilterResponse[]>>{
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let params = new HttpParams()
      .set('sessao', idSessao)
    return this.http$.get<ApiResponse<FilterResponse[]>>(`${environment.apiURL}/hospital`, {params:  params, ...httpOptions$});
  }

  public GetConvenio(idSessao: string): Observable<ApiResponse<FilterResponse[]>>{
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let params = new HttpParams()
      .set('sessao', idSessao)
    return this.http$.get<ApiResponse<FilterResponse[]>>(`${environment.apiURL}/convenio`, {params:  params, ...httpOptions$});
  }

  public GetMedico(idSessao: string): Observable<ApiResponse<FilterResponse[]>>{
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let params = new HttpParams()
      .set('sessao', idSessao)
    return this.http$.get<ApiResponse<FilterResponse[]>>(`${environment.apiURL}/medico`, {params:  params, ...httpOptions$});
  }

  public GetPatologista(idSessao: string): Observable<ApiResponse<FilterResponse[]>>{
    const httpOptions$ = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    let params = new HttpParams()
      .set('sessao', idSessao)
    return this.http$.get<ApiResponse<FilterResponse[]>>(`${environment.apiURL}/patologista`, {params:  params, ...httpOptions$});
  }
}
