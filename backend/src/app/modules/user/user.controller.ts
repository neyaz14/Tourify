import { NextFunction, Request, Response } from "express";

import { userServices } from "./user.service";
import { sendResponse } from "../../utilis/sendResponse";
import { catchAsync } from "../../utilis/catchAsync";
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})



const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await userServices.getAllUsersService()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: allUsers,
    })
})




const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const payload = req.body;

    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token, envVars.JWT_Secrect)
    const verifiedToken = req.user;

    const updatedInfo = await userServices.updateUserService(userId, payload, verifiedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: updatedInfo,
    })
})



export const userControllers = { createUser, getAllUsers, updateUser }