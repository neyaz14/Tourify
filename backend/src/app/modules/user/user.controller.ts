import { NextFunction, Request, Response } from "express";

import { userServices } from "./user.service";
import { sendResponse } from "../../utilis/sendResponse";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new AppError()
        const newUser = await userServices.createUserService(req.body)

        res.status(201).json({
            message: `User created successfuly !!`,
            newUser
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await userServices.getAllUsersService();

        // res.status(201).json({
        //     message: `all users`,
        //     data: allUsers
        // })
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "all user data showed successfully",
            data: allUsers,
        })
    } catch (error) {
        console.log(error);
    }
}




export const userControllers = { createUser, getAllUsers }