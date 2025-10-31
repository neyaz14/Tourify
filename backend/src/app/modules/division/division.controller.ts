import { Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { divisionServices } from "./division.service";
import { sendResponse } from "../../utilis/sendResponse";

import httpStatus from "http-status-codes"


const createDivisioin = catchAsync(async (req: Request, res: Response) => {
    const division = await divisionServices.createDivisioin(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division Created Successfully",
        data: division
    })
})



const getAllDivision = catchAsync(async (req: Request, res: Response) => {
    const allDivision = await divisionServices.getAllDivision(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "All division ",
        data: allDivision
    })
})


export const divisionController = {
    createDivisioin, getAllDivision
}