import { JwtPayload } from "jsonwebtoken";
import { Booking_Status, IBooking } from "./booking.interface";
import { User } from "../user/user.model";
import AppError from "../../errorhelpers/AppError";
import httpStatus from "http-status-codes"
import { Tour } from "../tour/tour.model";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

const createBooking = async (payload: Partial<IBooking>, userInfo: JwtPayload) => {
    const session = await Booking.startSession()
    session.startTransaction();

    const transactionId = getTransactionId();

    try {

        // console.log('userid from the controller =', userInfo.id);
        const user = await User.findById(userInfo.id);
        // console.log('user info - from model ', user, 'transiction Id ===>', transactionId);

        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour.Add phone or address")
        }
        const tour = await Tour.findById(payload.tour).select("costFrom");
        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found!")
        }
        const amount = Number(tour.costFrom) * Number(payload.guestCount);

        const booking = await Booking.create([{
            user: userInfo.id,
            status: Booking_Status.PENDING,
            ...payload
        }], { session })

        const payment = await Payment.create([{
            booking: booking[0]._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount
        }], { session });

        const updatedBooking = await Booking
            .findByIdAndUpdate(
                booking[0]._id,
                { payment: payment[0]._id },
                { new: true, runValidators: true, session }
            )
            .populate("user", "name email phone address")
            .populate("tour", "title costFrom")
            .populate("payment");

        await session.commitTransaction();
        session.endSession();

        return { updatedBooking };
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }

}
const getAllBookings = async () => {

    return {}
}

export const bookingServices = {
    createBooking, getAllBookings
}

