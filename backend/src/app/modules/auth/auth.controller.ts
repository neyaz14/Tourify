import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import { authService } from "./auth.service";
import AppError from "../../errorhelpers/AppError";
import { setAuthCookie } from "../../utilis/setCookies";


const credentialsLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = await authService.credentialsLoginService(req.body);
    console.log(userInfo);

    // setting auth cookies in the browser
    setAuthCookie(res, userInfo)


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

    const tokenInfo = await authService.getNewAccessTokenService(refreshToken);

    setAuthCookie(res, tokenInfo)

    // console.log(userInfo);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user login  Successfully",
        data: tokenInfo,
    })
})


const logOutController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user Logged out  Successfully",
        data: null,
    })
})

export const authControllers = {
    credentialsLoginController, getNewAccessTokenController, logOutController
}