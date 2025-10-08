import express, { Request, Response } from "express";
import { userRouter } from "./app/modules/user/user.route";
import cors from "cors";

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

app.use("/api/v1/user", userRouter)

export default app;