import { Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { divisionServices } from "./division.service";
import { sendResponse } from "../../utilis/sendResponse";

import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";
import { IDivision } from "./division.interface";


const createDivisioin = catchAsync(async (req: Request, res: Response) => {
    console.log({
        file: req.file,
        body: req.body
    });
    const payload : IDivision = {
        ...req.body,
        thumbnail: req.file?.path
    }
    const division = await divisionServices.createDivisioin(payload);

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
    // const payload = req.body;
    const payload : IDivision = {
        ...req.body,
        thumbnail: req.file?.path
    }
    // console.log("Payload from the updatedivController ==> ", payload);

    // const verifiedToken = req.user;

    const updatedDivision = await divisionServices.updateDivision(divisionId, payload)

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