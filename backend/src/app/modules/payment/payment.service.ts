import { HttpStatusCode } from "axios";
import AppError from "../../errorhelpers/AppError";
import { Booking_Status } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";
import { sslCommerzService } from "../sslCommerz/sslcom.service";
import { ISSLCommerz } from "../sslCommerz/sslcom.interface";


const initPayment =async (bookingId: string)=>{
const payment = await Payment.findOne({ booking: bookingId })

    if (!payment) {
        throw new AppError(HttpStatusCode.NotFound, "Payment Not Found. You have not booked this tour")
    }

    const booking = await Booking.findById(payment.booking)

    const userAddress = (booking?.user as any).address
    const userEmail = (booking?.user as any).email
    const userPhoneNumber = (booking?.user as any).phone
    const userName = (booking?.user as any).name

    const sslPayload: ISSLCommerz = {
        address: userAddress,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        name: userName,
        amount: payment.amount,
        transactionId: payment.transactionId
    }

    const sslPayment = await sslCommerzService.sslCommerzInit(sslPayload)

    return {
        paymentUrl: sslPayment
    }
}


const successPayment = async (query: Record<string,string>)=>{

    // Update Booking Status to COnfirm 
    // Update Payment Status to PAID

    const session = await Booking.startSession();
    session.startTransaction()

    try {

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PAYMENT_STATUS.PAID,
        }, { new: true, runValidators: true, session: session })

        await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: Booking_Status.COMPLETE },
                { runValidators: true, session }
            )

        await session.commitTransaction(); //transaction
        session.endSession()
        return { success: true, message: "Payment Completed Successfully" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
}

const cancelPayment = async (query: Record<string,string>)=>{

   // Update Booking Status to FAIL
    // Update Payment Status to FAIL

    const session = await Booking.startSession();
    session.startTransaction()

    try {


        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PAYMENT_STATUS.FAILED,
        }, { new: true, runValidators: true, session: session })

        await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: Booking_Status.FAILED },
                { runValidators: true, session }
            )

        await session.commitTransaction(); //transaction
        session.endSession()
        return { success: false, message: "Payment Failed" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
}

const failPayment = async (query: Record<string,string>)=>{

      // Update Booking Status to CANCEL
    // Update Payment Status to CANCEL

    const session = await Booking.startSession();
    session.startTransaction()

    try {

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PAYMENT_STATUS.CANCELLED,
        }, { runValidators: true, session: session })

        await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: Booking_Status.CANCEL },
                { runValidators: true, session }
            )

        await session.commitTransaction(); //transaction
        session.endSession()
        return { success: false, message: "Payment Cancelled" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
}



export const paymentService = {

    initPayment , successPayment , cancelPayment, failPayment
}