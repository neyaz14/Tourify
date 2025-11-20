import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import { authService } from "./auth.service";
import AppError from "../../errorhelpers/AppError";
import { setAuthCookie } from "../../utilis/setCookies";
import { createUserTokens } from "../../utilis/userTokens";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";



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


// ! Password Related controllers 
// ? Reset password
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

    await authService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})

const setPasswordController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken : JwtPayload = req.user;
    const { password } = req.body;

    await authService.setPassword(decodedToken.userId, password);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
});


const forgetPasswordController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //
})
const changePasswordController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //
})


// ! Google passport js related things 
// ? google login create
const googleAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body)

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {

            // ❌❌❌❌❌
            // throw new AppError(401, "Some error")
            // next(err)
            // return new AppError(401, err)


            // ✅✅✅✅
            // return next(err)
            // console.log("from err");
            return next(new AppError(401, err))
        }

        if (!user) {
            // console.log("from !user");
            // return new AppError(401, info.message)
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserTokens(user)

        // delete user.toObject().password

        const { password: pass, ...rest } = user.toObject()


        setAuthCookie(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })


    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })


})

const googleCallback = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : "";

    if (redirectTo.startsWith('/')) {
        redirectTo = redirectTo.slice(1)
    }
    // console.log("from the controller -- ");
    const user = req.user;
    // console.log('user from req ', user);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }
    const tokenInfo = createUserTokens(user);

    setAuthCookie(res, tokenInfo)


    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)


    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "user Logged out  Successfully",
    //     data: null,
    // })
})


export const authControllers = {
    credentialsLoginController, getNewAccessTokenController, logOutController, googleCallback, resetPassword, googleAuth, setPasswordController, forgetPasswordController, changePasswordController
}