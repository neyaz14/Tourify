import { z } from "zod"
import { Booking_Status } from "./booking.interface";

export const createZodSchema = z.object({
    tour: z.string(),
    guestCount: z.number().positive()
})

export const updateBookingStatusZodSchema = z.object({
    status: z.enum(Object.values(Booking_Status) as [string])
});