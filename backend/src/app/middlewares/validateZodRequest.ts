import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";



export const validateRequest = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        req.body = await zodSchema.parseAsync(req.body)
        console.log('from the validateZodRequest, req.body --->>', req.body);
        next();
    } catch (error) {
        console.log("Error from validateZodRequest ==>>", error);
        next(error)
    }
}