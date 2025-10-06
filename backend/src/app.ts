import express, { Request, Response } from "express";

const app = express()

// let hwllo;
app.get("/", (req: Request, res: Response) => {
    // console.log("lets see what happen");
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

export default app;