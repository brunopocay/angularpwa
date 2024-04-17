import { Exame } from "./Exame";

export interface ApiResponseExames {
    IsSucess: boolean;
    Message: string;
    Data?: {
        TotalExames: number;
        Exames: Exame[];
    };
}