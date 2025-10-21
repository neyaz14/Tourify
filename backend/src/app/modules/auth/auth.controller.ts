import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import { authService } from "./auth.service";
import AppError from "../../errorhelpers/AppError";


const credentialsLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = await authService.credentialsLoginService(req.body);

    res.cookie("refreshToken", userInfo.refreshToken, {
        httpOnly: true,
        secure: false
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user login  Successfully",
        data: userInfo,
    })
})



const getNewAccessTokenController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    // console.log("refreshToken", refreshToken);
    if (!refreshToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token not found");
    }

    const userInfo = await authService.getNewAccessTokenService(refreshToken);

    // console.log(userInfo);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user login  Successfully",
        data: userInfo,
    })
})
export const authControllers = {
    credentialsLoginController, getNewAccessTokenController
}