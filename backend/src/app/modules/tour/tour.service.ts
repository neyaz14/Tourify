import AppError from "../../errorhelpers/AppError";
import { ITourType } from "./tour.interface";
import { TourType } from "./tour.model";
import httpsStatusCode from "http-status-codes"

const createTourType = async (payload: ITourType) => {
    const existingTourType = await TourType.findOne({ name: payload.name });
    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }
    return await TourType.create(payload);
}

const getAllTourTypes = async () => {
    return await TourType.find();
}


const updateTourType = async (id: string, payload: Partial<ITourType>) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new AppError(httpsStatusCode.BAD_REQUEST, "Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
}

const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new AppError(httpsStatusCode.BAD_REQUEST, "Tour type not found.");
    }
    const result = await TourType.findByIdAndDelete(id);
    return result;
}

export const TourService = {
    createTourType, updateTourType, deleteTourType, getAllTourTypes
}