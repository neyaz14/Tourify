import express, { Request, Response } from "express";

import cors from "cors";
import v1Router from "./app/routes";

import { globalErrorHandler } from "./app/middlewares/globalError";

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
app.use(globalErrorHandler)
// todo: make it middleware 1
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route Not found"
    })
})

export default app;