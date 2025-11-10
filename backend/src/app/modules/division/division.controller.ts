import { Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { divisionServices } from "./division.service";
import { sendResponse } from "../../utilis/sendResponse";

import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";


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

const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const divisionId = req.params.id;
    const payload = req.body;

    const verifiedToken = req.user;

    const updatedDivision = await divisionServices.updateDivision(divisionId, payload, verifiedToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division updated Successfully",
        data: updatedDivision,
    })
})


const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    //
    const divisionId = req.params.id;

})

export const divisionController = {
    createDivisioin, getAllDivision, updateDivision, deleteDivision
}