import AppError from "../../errorhelpers/AppError";
import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import httpsStatusCode from "http-status-codes"


// *---------------- TourType
const createTourType = async (payload: ITourType) => {
    console.log('from inside the service ===>', payload);
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



// *---------------- Tour

const createTour = async (payload: ITour) => {
    console.log("inside the createTour service ==>", payload);
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }
    // // ?---- working on the slug
    // const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    // let slug = `${baseSlug}`

    // let counter = 0;
    // while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}` // dhaka-division-2
    // }

    // payload.slug = slug;

    const tour = await Tour.create(payload)

    return tour;
};


const updateTour = async (id: string, payload: Partial<ITour>) => {

    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }

    // if (payload.title) {
    //     const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    //     let slug = `${baseSlug}`

    //     let counter = 0;
    //     while (await Tour.exists({ slug })) {
    //         slug = `${slug}-${counter++}`

    //     }

    //     payload.slug = slug
    // }

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
};

const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};


const getAllTours = async (query: Record<string, string>) => {
    console.log("from inside getAllTours - query ==>", query);
    const filter = query;
    const searchTerm = query.searchTerm || "";
    const sort = query.sort || "-createdAt"
    console.log("from inside getAllTours - filter ==>", filter);
    
   
    const excludeField = ["searchTerm", "sort"];

    const finalFilter : Record<string, string> = Object.keys(filter).reduce((acc, key)=>{
        if(!excludeField.includes(key)){
            acc[key] = filter[key];
        }
        return acc;
    },{})
    console.log('finalFilter', finalFilter);
    
    console.log("from inside getAllTours - filter - after delelting the searchTerm  ==>", filter);
   
    const searchArray = tourSearchableFields.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }));
    const tours = await Tour.find({
        $or: searchArray
    }).find(finalFilter).sort(sort);


    console.log("from inside getAllTours - Tours ==>", tours);

    return tours;
};


export const TourService = {
    createTourType, updateTourType, deleteTourType, getAllTourTypes, createTour, updateTour, deleteTour, getAllTours
}
