import { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorhelpers/AppError"
import { IDivision } from "./division.interface"
import { Division } from "./division.model"
import httpsCdoe from "http-status-codes"


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


const updateDivision = async (divisionId: string, payload: Partial<IDivision>, verifiedToken: JwtPayload) => {
    //first check the name 
    const existngDivision = await Division.findOne({ name: payload.name });
    if (!existngDivision) {
        throw new AppError(httpsCdoe.BAD_REQUEST, "A division with this name already exists");
    }

    // check if division Name if exists in another doc
    // prevent duplicate division 
    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: {$ne: divisionId} 
    })
    if(duplicateDivision){
        throw new AppError(httpsCdoe.BAD_REQUEST, 'Has a same division name with this Name')
    }

    // creating the slug
     const baseSlug = payload.name?.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-division`;

    let counter = 0;
    while (await Division.exists({ slug })) {
        slug = `${slug}-${counter++}`;
    }

    payload.slug = slug;

    const newDivision = await Division.findByIdAndUpdate(divisionId, payload, {
        new: true, runValidators: true
    })

    return newDivision;
}

export const divisionServices = {
    createDivisioin, getAllDivision,
    deleteDivision, updateDivision
}