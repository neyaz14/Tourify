import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorhelpers/AppError";
import { TErrorSources } from "../interfaces/error.types";
import { handleDuplicateError } from "../errorhelpers/handleduplicateerror";
import { handleCastError } from "../errorhelpers/handleCastError";
import { handleZodError } from "../errorhelpers/handleZodError";
import { handleMongooseValidationError } from "../errorhelpers/handleMongooseValidationError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorSource: TErrorSources[] = [];
    let statusCode = 500;
    let message = `Something went wrong `;


    // if (envVars.NODE_ENV === "development") {
    //     console.log(err);
    // }

    //all if statements run sequentially.
    // Even if the first one (err instanceof AppError) matches,
    // the second if (err instanceof Error) also runs (since AppError extends Error)
    // and overwrites the statusCode with 500.

    //* handle duplicate error 
    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        console.log('inside ==> simplified error -->', simplifiedError);
    }
    // * objectid or cast error 
    else if (err.name === "CastError") {
        console.log('form the casterror inside -->', err);
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        console.log('simplified error -->', simplifiedError);
    }

    // * Zod error
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource as TErrorSources[];
    }

    // Mongoose Validation Error
    else if(err.name === "ValidationError"){
        const simplifiedError = handleMongooseValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource as TErrorSources[];
    }


    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;

        console.log(err);
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }





    res.status(statusCode as number).json({
        success: false,
        message: message,
        stack: envVars.NODE_ENV === "development" ? err.stack : null,
        err,
        errorSource
    })
    // after sneding response dont use next, it re assing the headers or response in the response
    // next();
}