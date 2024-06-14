import { FilterResponse } from "../Models/FilterResponse";
import { GetfiltrosService } from "../Services/getfiltros.service";
import { lastValueFrom } from "rxjs";

export class GetFilterResponseRepository {
    constructor(private getfiltroservice: GetfiltrosService) {}

    public async GetAllFilters(idSessao: string): Promise<{ origens: FilterResponse[], convenios: FilterResponse[], hospitais: FilterResponse[], medicos: FilterResponse[], patologistas: FilterResponse[] }> {
        try {
            const origensPromise = this.GetOrigem(idSessao);
            const conveniosPromise = this.GetConvenio(idSessao);
            const hospitaisPromise = this.GetHospital(idSessao);
            const medicosPromise = this.GetMedico(idSessao);
            const patologistasPromise = this.GetPatologista(idSessao);

            const [origens, convenios, hospitais, medicos, patologistas] = await Promise.all([
                origensPromise,
                conveniosPromise,
                hospitaisPromise,
                medicosPromise,
                patologistasPromise
            ]);

            return {
                origens,
                convenios,
                hospitais,
                medicos,
                patologistas
            };
        } catch (error) {
            console.error("Erro ao obter os dados dos filtros:", error);
            throw error;
        }
    }

    public async GetOrigem(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetOrigem(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados de origem:", error);
            throw error; 
        }
    }

    public async GetConvenio(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetConvenio(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados do convenio:", error);
            throw error; 
        }
    }

    public async GetHospital(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetHospital(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados do hospital:", error);
            throw error; 
        }
    }

    public async GetMedico(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetMedico(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados do médico", error);
            throw error; 
        }
    }
    
    public async GetPatologista(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetPatologista(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados do patologista:", error);
            throw error; 
        }
    }
}
