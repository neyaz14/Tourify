// import { NextFunction, Request, Response } from "express";

// type AsyncHandler = (req: Request, res: Response, next:NextFunction) => Promise<void>


// export const catchAsync = (func: AsyncHandler)=> (req: Request, res: Response, next:NextFunction) =>{
//     Promise.resolve(func(req, res, next)).catch((err)=>{
//         next(err);
//     })
// }

import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
        // console.log(err);
        if(envVars.NODE_ENV ==="development"){
            console.log("Error from catchAsync ===>",err);
        }
        next(err)
    })
}