import { Request, Response } from "express"
import { catchAsync } from "../../utilis/catchAsync"
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utilis/sendResponse";
import { envVars } from "../../config/env";

const initPayment = catchAsync(async (req: Request, res: Response) => {

    console.log('Entered the route successfully ------------------------------');
    const bookingId = req.params.bookingid;
    console.log(bookingId);
    console.log('req.wuery --->', req.query);
    const result = await paymentService.initPayment(bookingId as string)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Payment url provided successfully",
        data: result,
    })
})

const successPayment = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;
    const result = await paymentService.successPayment(query as Record<string, string>);

    if(result.success){
        res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }

    // sendResponse(res, {
    //     statusCode: 201,
    //     success: true,
    //     message: "Payment done successfully",
    //     data: result,
    // })

    // return result;
})


const failPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await paymentService.failPayment(query as Record<string, string>)

    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
});
const cancelPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await paymentService.cancelPayment(query as Record<string, string>)

    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
});

export const paymentController = {
    initPayment, successPayment, failPayment, cancelPayment
}