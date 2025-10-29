export interface TErrorSources{
    path: string ,
    message: string
}

export interface TGenericResponse{
    statusCode: number,
    message: string,
    errorSource?: TErrorSources[]
} 
