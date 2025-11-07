import { TGenericResponse } from "../interfaces/error.types";

export const handleDuplicateError=(error: any): TGenericResponse =>{
    const matchedArray = error.message.match(/"([^"]*)"/)
console.log('matched array -->', matchedArray);
    return {
        statusCode : 400,
        message: `${matchedArray[0]} already exists!!`
    }
}