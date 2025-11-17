import AppError from "../../errorhelpers/AppError";
import { excludeField } from "../../global.constat";
import { QueryBuilder } from "../../utilis/queryBuilder";
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

    // if (payload.images){
    //     payload.images.push()
    //  }
    throw new Error("A tour with this title already exists.");

    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }

    const tour = await Tour.create(payload)

    return tour;
    // return payload;
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
    const queryBuilder = new QueryBuilder(Tour.find(), query)

    // console.log("QueryBuilder ==> ", queryBuilder);
    // console.log("ModelQuery   ==> ", Tour.find());

    const allTours = await
        queryBuilder
            .filter()
            .search(tourSearchableFields)
            .sort().skip().limit()
            .build();

    const metaData = await queryBuilder.getMetaData();
    console.log(metaData);
    return {
        data: allTours,
        metadata: metaData
    }
};

// ? old way to do that 
const getAllToursOld = async (query: Record<string, string>) => {
    console.log("from inside getAllTours - query ==>", query);
    const filter = query;
    const searchTerm = query.searchTerm || "";
    const sort = query.sort || "-createdAt";
    const page = parseInt(query.page)
    const limit = parseInt(query.limit) || 5;
    const skip = (parseInt(query.page) - 1) * limit;

    // do field filtering
    const filterField = query.filterField?.split(',').join(" ") || "";
    console.log("from inside getAllTours - filter ==>", filter);

    const finalFilter: Record<string, string> = Object.keys(filter).reduce((acc, key) => {
        if (!excludeField.includes(key)) {
            acc[key] = filter[key];
        }
        return acc;
    }, {} as Record<string, string>)
    console.log('finalFilter', finalFilter);

    console.log("from inside getAllTours - filter - after delelting the searchTerm  ==>", filter);

    const searchObject = { $or: tourSearchableFields.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } })) };
    //? we can do inline query 
    // const tours = await Tour.find(searchObject).find(finalFilter).sort(sort).select(filterField).limit(limit).skip(skip);
    //? alternative
    const filterQuery = Tour.find(filter);
    //?await na deoay, promise resolve hocce na and data o asbe na
    const tours = filterQuery.find(searchObject)

    const allTours = await tours.sort(sort).select(filterField).limit(limit).skip(skip);
    console.log("from inside getAllTours - Tours ==>", allTours);
    const totalTours = await Tour.countDocuments();

    const totalPage = Math.ceil(totalTours / limit)
    const metaData = {
        totalData: totalTours,
        page: page,
        totalPage: totalPage,
        limit: limit,
        skip: skip
    }

    return {
        data: allTours,
        metadata: metaData
    }
};


const getSingleTour = async (slug: string) => {

    const singleTour = await Tour.findOne({ slug: slug });
    return { data: singleTour }
}

export const TourService = {
    createTourType, updateTourType, deleteTourType, getAllTourTypes, createTour, updateTour, deleteTour, getAllTours, getSingleTour
}
