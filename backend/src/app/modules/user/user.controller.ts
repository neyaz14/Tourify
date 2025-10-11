import { NextFunction, Request, Response } from "express";

import { userServices } from "./user.service";
import { sendResponse } from "../../utilis/sendResponse";
import { catchAsync } from "../../utilis/catchAsync";
import httpStatus from "http-status-codes"


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})



const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const allUsers = await userServices.getAllUsersService()

    sendResponse(res, {
         success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: allUsers,
    })
})




export const userControllers = { createUser, getAllUsers }