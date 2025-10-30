import { Types } from "mongoose";

export interface ITour{
    title: string,
    slug: string,
    description ?: string,
    thumbnail?: string,
    images?: string[],
    location?: string,
    costFrom?: number,
    startDate?: Date,
    endDate?: Date,
    include?: string[],
    exclude?: string[],
    amenities?: string[],
    tourPlan? : string[],

    maxGuest?: number,
    minAge?: number,
    division: Types.ObjectId,
    tourType: Types.ObjectId
}