import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { catchError, take, throwError, merge, startWith, switchMap, of as observableOf, map,} from 'rxjs';
import { Exame } from '../../Models/Exame';
import { AuthService } from '../../Services/auth.service';
import { ExamesService } from '../../Services/exames.service';
import { DownloadService } from '../../Services/download.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormatarDataParaString,  addDaysToDate} from '../../Helpers/FormatarData';
import { ApiResponseExames } from '../../Models/ApiResponseExames';
import { GetfiltrosService } from '../../Services/getfiltros.service';
import { FilterResponse } from '../../Models/FilterResponse';
import { GetFilterResponseRepository } from '../../Shared/GetFilterResponseRepository';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-show-filter',
  templateUrl: './form-show-filter.component.html',
  styleUrls: ['./form-show-filter.component.css'],
})
export class FormShowFilterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Data',
    'Nr.Exame',
    'Nr.Guia',
    'Previsão de Resultado',
    'Paciente',
    'Exame',
    'Situação',
    'Laudo',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('formulario') formulario: NgForm;

  dataMin: string;
  dataMax: string;
  requisicao: string;
  nomePaciente: string;
  convenio: string;
  hospital: string;
  nomeOrigem: string;
  patologista: string;
  medico: string;
  totalExames: number | undefined;
  listaDeExames: Exame[] = [];
  origens: FilterResponse[] = [];
  hospitais: FilterResponse[] = [];
  medicos: FilterResponse[] = [];
  convenios: FilterResponse[] = [];
  patologistas: FilterResponse[] = [];
  localStorageItens: { tipoUsuario: string | null; sessao: string | null };
  dataSource = new MatTableDataSource<Exame>();
  repository: GetFilterResponseRepository;
  IsLoading = true;

  constructor(
    private examesService$: ExamesService,
    private authService$: AuthService,
    private downloadService$: DownloadService,
    private getFiltroService: GetfiltrosService
  ) {
    this.repository = new GetFilterResponseRepository(getFiltroService);
  }

  ngOnInit(): void {
    this._getLocalStorage();
    this.repository.GetAllFilters(this.localStorageItens.sessao!);
    this.dataSource.paginator!.pageIndex = 0;
    this.GetListaExames();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.IsLoading = true;
          return this.examesService$
            .GetExamesWithFilter(
              this.localStorageItens.sessao!,
              this.dataSource.paginator!.pageIndex,
              FormatarDataParaString(this.dataMin),
              FormatarDataParaString(this.dataMax),
              this.nomePaciente,
              this.nomeOrigem,
              this.convenio,
              this.hospital,
              this.patologista,
              this.medico,
              this.requisicao
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((response) => {
          if (response === null) {
            return [];
          }
          this.IsLoading = false;

          this.totalExames = response.Data!.TotalExames;
          return response.Data!.Exames;
        })
      )
      .subscribe((response) => {
        this.dataSource.data = response;
      });
  }

  getMaxDate = () => {
    return addDaysToDate(this.dataMin, 30);
  };

  updateMaxDate(): void {
    if (this.dataMin) {
      this.dataMax = addDaysToDate(this.dataMin, 30);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByData(): void {
    if (!this.dataMin || !this.dataMax) {
      Swal.fire('Data inicial e/ou data final não preenchido.', 'Preencha os filtros de data !', 'error'
      );
    } else {
      const dataMinDate = new Date(this.dataMin);
      const dataMaxDate = new Date(this.dataMax);

      // Adiciona 180 dias à data mínima
      const dataMaxLimite = new Date(dataMinDate.getTime());
      dataMaxLimite.setDate(dataMaxLimite.getDate() + 180);

      if (dataMinDate > dataMaxDate) {
        Swal.fire('Data inicial maior que a data final.','Preencha o filtro novamente !','error');
      } else if (dataMaxDate > dataMaxLimite) {
        Swal.fire('Data final fora do intervalo permitido.','A data final não pode exceder 180 dias após a data inicial !','error');
      } else {
        // Formate as datas para o formato desejado
        const dataMinFormatted = FormatarDataParaString(this.dataMin);
        const dataMaxFormatted = FormatarDataParaString(this.dataMax);

        this.dataSource.paginator!.pageIndex = 0;
        // Chame a função GetListaExames com os filtros
        this.GetListaExames(
          dataMinFormatted,
          dataMaxFormatted,
          this.nomePaciente || undefined,
          this.nomeOrigem || undefined,
          this.convenio || undefined,
          this.hospital || undefined,
          this.patologista || undefined,
          this.medico || undefined,
          this.requisicao || undefined
        );
      }
    }
  }

  limparFiltros() {
    (this.dataMin = ''),
      (this.dataMax = ''),
      (this.nomePaciente = ''),
      (this.nomeOrigem = ''),
      (this.convenio = ''),
      (this.hospital = ''),
      (this.patologista = ''),
      (this.medico = ''),
      (this.requisicao = '');
  }

  GetListaExames(
    dataMinFormatted?: string,
    dataMaxFormatted?: string,
    paciente?: string,
    origem?: string,
    convenio?: string,
    hospital?: string,
    patologistas?: string,
    medico?: string,
    nrguia?: string
  ) {
    this.IsLoading = true;
    this.dataSource.data = [];
    this.examesService$
      .GetExamesWithFilter(
        this.localStorageItens.sessao!,
        this.dataSource.paginator?.pageIndex,
        dataMinFormatted,
        dataMaxFormatted,
        paciente,
        origem,
        convenio,
        hospital,
        patologistas,
        medico,
        nrguia
      )
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          if (error) {
            this.IsLoading = false;
            console.log(error.error.Error);
          }
          return throwError(() => error.error);
        })
      )
      .subscribe((response: ApiResponseExames) => {
        this.dataSource.data = response.Data!.Exames;
        this.IsLoading = false;
        this.listaDeExames = this.dataSource.data;
        this.totalExames = response.Data?.TotalExames;
      });
  }

  private _getLocalStorage() {
    this.localStorageItens = this.authService$.getAuthSessao();
  }

  //TODO: realizar botão de aguardando download.
  protected DownloadPDF(nrExame: string) {
    Swal.fire({
      title: 'Efetuando download...',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let nrExameFormatado = nrExame.replace('/', '');
    this.downloadService$.DownloadPDF(
      this.localStorageItens.sessao!,
      nrExameFormatado
    );
  }
}
