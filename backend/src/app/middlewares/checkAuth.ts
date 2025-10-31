import { NextFunction, Request, Response } from "express";
import AppError from "../errorhelpers/AppError";
import { verifyToken } from "../utilis/jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) throw new AppError(403, "No token recived");

        const verifiedToken = verifyToken(accessToken, envVars.JWT_Secrect) as JwtPayload;  
        console.log(accessToken);

        if (authRoles.includes(verifiedToken.role)) {
            req.user = verifiedToken;
            next();
        } else {
            throw new AppError(401, "User not allowed to see the data ")
        }
    } catch (error) {
        next(error)
    }
}