import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";



export const validateRequest = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    console.log('from error of validatezod request ---> ', req.body.data);
    try {

        // req.body = JSON.parse(req.body.data) || req.body
        if ( req.body.data) {
            req.body = JSON.parse(req.body.data)
        }
        req.body = await zodSchema.parseAsync(req.body)
        next()
    } catch (error) {
        console.log("Error from validateZodRequest ==>>", error);
        console.log('from error of validatezod request ---> ', req.body.data);
        next(error)
    }
}