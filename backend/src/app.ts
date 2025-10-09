import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./app/modules/user/user.route";
import cors from "cors";
import v1Router from "./app/routes";

const app = express()
app.use(express.json())
app.use(cors())
// let hwllo;
app.get("/", (req: Request, res: Response) => {
    // console.log("lets see what happen");
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

app.use("/api/v1", v1Router)

// ? global error handler 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: `Something went wrong ! ${err.message}`

    })
})

export default app;