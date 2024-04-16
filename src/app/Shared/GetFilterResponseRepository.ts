import { FilterResponse } from "../Models/FilterResponse";
import { GetfiltrosService } from "../Services/getfiltros.service";
import { lastValueFrom } from "rxjs";

export class GetFilterResponseRepository {
    constructor(private getfiltroservice: GetfiltrosService) {}

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
            console.error("Erro ao obter os dados de origem:", error);
            throw error; 
        }
    }

    public async GetHospital(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetHospital(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados de origem:", error);
            throw error; 
        }
    }

    public async GetMedico(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetMedico(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados de origem:", error);
            throw error; 
        }
    }
    
    public async GetPatologista(idSessao: string): Promise<FilterResponse[]> {
        try {
            const response = await lastValueFrom(this.getfiltroservice.GetPatologista(idSessao));
            return response!.Data;
        } catch (error) {
            console.error("Erro ao obter os dados de origem:", error);
            throw error; 
        }
    }
}
