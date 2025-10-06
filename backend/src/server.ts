/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
// import { envVars } from "./app/config/env";

let server: Server;
const DB_URL ="mongodb+srv://phLevel2:PHLevel2PWCourse@cluster0.epj76.mongodb.net/TodosDB?retryWrites=true&w=majority&appName=Cluster0"
const PORT = 5000;

const startServer = async () => {
    try {
        await mongoose.connect(DB_URL)

        console.log("Connected to DB!!");

        server = app.listen(PORT, () => {
            console.log(`Server is listening to port ${PORT}`);
        });
    } catch (error) {
        console.log('err ---------------->>>',error);
    }
}

startServer()

