import { TErrorSources, TGenericResponse } from "../interfaces/error.types";


export const handleMongooseValidationError = (error: any): TGenericResponse => {

    const errorSource: TErrorSources[] = []

    const errors = Object.values(error.errors)

    errors.forEach((errorObject: any) => errorSource.push({
        path: errorObject.path,
        message: errorObject.message
    }))

    const pathError = error.message;
    const match = pathError.match(/`([^`]+)` is required/);
    console.log(match[0]); 


    // console.log(">>>>>>>>>>>>>>>>>", errors);
    // console.log(">>>>>>>>>>>>>>>>>", match);

    return {
        statusCode: 400,
        message: `${error._message}. ${match[0]}`,
        errorSource
    }
}