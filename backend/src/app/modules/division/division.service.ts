import { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorhelpers/AppError"
import { IDivision } from "./division.interface"
import { Division } from "./division.model"
import httpsCdoe from "http-status-codes"
import { deleteImageFromCloudinary } from "../../config/cloudinary.config"


const createDivisioin = async (payload: Partial<IDivision>) => {
    console.log("from createDivision service ==>", payload);
    const existngDivision = await Division.findOne({ name: payload.name });
    if (existngDivision) {
        throw new AppError(httpsCdoe.BAD_REQUEST, "A division with this name already exists");
    }
    // const baseSlug = payload.name?.toLocaleLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;

    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`;
    // }

    // payload.slug = slug;
    console.log('before creating a division , checking the payload ==>', payload);
    const newDivision = await Division.create(payload);
    console.log("after saving, new division ==>", newDivision);

    return newDivision;
}


const getAllDivision = async (payload: Partial<IDivision>) => {
    const allDivision = await Division.find();

    return allDivision;
}

const deleteDivision = async (payload) => {
    //
}


const updateDivision = async (divisionId: string, payload: Partial<IDivision>) => {
    //first check the name 
    const existngDivision = await Division.findById(divisionId);
    // console.log('existing division -->', existngDivision);
    if (!existngDivision) {
        throw new AppError(httpsCdoe.BAD_REQUEST, "No division Found with this id");
    }

    // check if division Name if exists in another doc
    // prevent duplicate division 
    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: divisionId }
    })
    if (duplicateDivision) {
        throw new AppError(httpsCdoe.BAD_REQUEST, 'Has a same division name with this Name')
    }

    

    // ? check if there is any image or not in the 
// TODO : Working on the division image update url 

    const newDivision = await Division.findByIdAndUpdate(divisionId, payload, {
        new: true, runValidators: true
    })
    if (payload.thumbnail && existngDivision.thumbnail) {
        await deleteImageFromCloudinary(existngDivision.thumbnail);
    }

    return newDivision;
}

export const divisionServices = {
    createDivisioin, getAllDivision,
    deleteDivision, updateDivision
}
