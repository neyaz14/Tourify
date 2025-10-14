import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import { createUserZodSchema } from "./userZodSchema"
import jwt, { JwtPayload } from "jsonwebtoken"
import { validateRequest } from "../../middlewares/validateZodRequest";
import AppError from "../../errorhelpers/AppError";
import { Role } from "./user.interface";
import { verifyToken } from "../../utilis/jwt";
import { envVars } from "../../config/env";
export const userRouter = Router();




export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) throw new AppError(403, "No token recived");

        const verifiedToken = verifyToken(accessToken,envVars.JWT_Secrect)
        // console.log(verifiedToken);

        if ((verifiedToken as JwtPayload).role === Role.Admin || (verifiedToken as JwtPayload).role === Role.Super_Admin) {
            next();
        } else {
            throw new AppError(401, "User not allowed to see the data ")
        }
    } catch (error) {
        next(error)
    }


}

// const verifyUserRole =()


userRouter.post("/register", validateRequest(createUserZodSchema), userControllers.createUser);

userRouter.get("/allUsers", verifyAccessToken, userControllers.getAllUsers)

