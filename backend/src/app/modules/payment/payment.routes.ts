import { Router } from "express";
import { paymentController } from "./payment.controller";

export const paymentRouter = Router()


paymentRouter.post('/initPayment/:bookingid'
    , paymentController.initPayment
)

paymentRouter.post('/success', paymentController.successPayment)
paymentRouter.post('/cancel',paymentController.cancelPayment)
paymentRouter.post('/fail', paymentController.failPayment)