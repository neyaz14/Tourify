import { ITourType } from "./tour.interface";


const createTourType = async (payload: ITourType) => {
    //
}

const getAllTourTypes = async () => {
    //
}


const updateTourType = async (id: string,payload: Partial<ITourType>) => {
    //
}

const deleteTourType = async (id: string) => {
    //
}

export const TourService = {
    createTourType, updateTourType, deleteTourType,getAllTourTypes
}