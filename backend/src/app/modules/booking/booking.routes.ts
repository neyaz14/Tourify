import { Router } from "express";
import { bookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateZodRequest";
import { createBookingZodSchema } from "./booking.zodSchema";

export const bookingRouter = Router();

bookingRouter.post('/create',
    checkAuth(Role.Admin, Role.Super_Admin),
    // validateRequest(createBookingZodSchema),
    bookingController.createBooking);


// bookingRouter.get('/',
//     // checkAuth(Role.Admin, Role.Super_Admin),
//     // validateRequest(createBookingZodSchema),
//     bookingController.createBooking);


// bookingRouter.post('/my-booking',
//     // checkAuth(Role.Admin, Role.Super_Admin),
//     // validateRequest(createBookingZodSchema),
//     bookingController.createBooking);


// bookingRouter.get('/:bookingId',
//     // checkAuth(Role.Admin, Role.Super_Admin),
//     // validateRequest(createBookingZodSchema),
//     bookingController.createBooking);


// bookingRouter.patch('/:bookingId/status',
//     // checkAuth(Role.Admin, Role.Super_Admin),
//     // validateRequest(createBookingZodSchema),
//     bookingController.createBooking);