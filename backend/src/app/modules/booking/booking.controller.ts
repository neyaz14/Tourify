import { Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { bookingServices } from "./booking.service";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const booking = await bookingServices.createBooking(req.body, decodedToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Booking created successfully",
        data: booking
    })
})

  

export const bookingController = {
    createBooking
}
