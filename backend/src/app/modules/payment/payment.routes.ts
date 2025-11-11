import { Router } from "express";
import { paymentController } from "./payment.controller";

export const paymentRouter = Router()


paymentRouter.get('/initialPayment'
    , paymentController.initPayment
)