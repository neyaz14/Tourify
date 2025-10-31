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
    const baseSlug = payload.name?.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-division`;

    let counter = 0;
    while (await Division.exists({ slug })) {
        slug = `${slug}-${counter++}`;
    }

    payload.slug = slug;
    console.log('before creating a division , checking the payload ==>', payload);
    const newDivision = await Division.create(payload);
    console.log("after saving, new division ==>", newDivision);

    return newDivision;
}


const getAllDivision = async (payload: Partial<IDivision>) => {
    const allDivision = await Division.find();

    return allDivision;
}

export const divisionServices = {
    createDivisioin, getAllDivision
}