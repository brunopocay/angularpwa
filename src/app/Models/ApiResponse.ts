export interface ApiResponse<T>{
    IsSucess: boolean;
    Message: string;
    Data: T;
}