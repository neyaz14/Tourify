import mongoose from "mongoose";
import { TGenericResponse } from "../interfaces/error.types";

export const handleCastError = (error: mongoose.Error.CastError): TGenericResponse => {

    console.log(error, "<==== inside the handleCastError function ");

    return {
        statusCode: 400,
        message: `Invalid Mongoose objectId. Please Provide a valid objectId`
    }
}