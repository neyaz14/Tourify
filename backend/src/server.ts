/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
// import { envVars } from "./app/config/env";

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DBURL)

        console.log("Connected to DB!!");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log('err ---------------->>>', error);
    }
}
startServer()

// server error handling

// 1 unhandled rejection error
// when any unhandle promise rejection will happen this code will shutdown the server
process.on("unhandledRejection", (err) => {
    console.log('unhandledRejection--server shutting down',"error -->>>>", err);

    if (server) {
        // server - express app server 
        server.close(() => {
            // process - nodejs server
            process.exit(1);
        });
    }
})


// any local problem of server , if we dont handle them with try catch 
// block then we will need to handle this 
process.on("uncaughtException", (err) => {
    console.log('uncaughtException--server shutting down',"error -->>>>", err);

    if (server) {
        // server - express app server 
        server.close(() => {
            // process - nodejs server
            process.exit(1);
        });
    }
})

// 3 signal termination (sigterm)

process.on("SIGTERM", () => {
    console.log('SIGTERM signal recived--server shutting down');

    if (server) {
        // server - express app server 
        server.close(() => {
            // process - nodejs server
            process.exit(1);
        });
    }
})




process.on("SIGINT", () => {
    console.log('sigint signal recived--server shutting down');

    if (server) {
        // server - express app server 
        server.close(() => {
            // process - nodejs server
            process.exit(1);
        });
    }
})

//---- Error Handling
// 1 unhandled rejection error -
// 2 unchaught rejection error
// 3 signal termination (sigterm)