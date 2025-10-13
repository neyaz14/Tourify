import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import { authService } from "./auth.service";


const credentialsLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = await authService.credentialsLoginService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user login  Successfully",
        data: userInfo,
    })
})

export const authControllers = {
    credentialsLoginController
}