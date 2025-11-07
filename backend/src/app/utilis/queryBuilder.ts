import { Query } from "mongoose";
import { excludeField } from "../global.constat";

export class QueryBuilder<T> {
    //? they are like the variable 
    public modelQuery: Query<T[], T>;
    public readonly query: Record<string, string>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // * methods
    filter(): this {
        const filter = { ...this.query };

        const finalFilter: Record<string, string> = Object.keys(filter).reduce((acc, kye) => {
            if (!excludeField.includes(kye)) {
                acc[kye] = filter[kye]
            }
            return acc;
        }, {} as Record<string, string>)

        this.modelQuery = this.modelQuery.find(finalFilter);

        return this;
    }

    search(searchAbleField: string[]): this {
        const searchTerm = this.query.searchTerm || "";
        const searchObject = { $or: searchAbleField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } })) };

        this.modelQuery = this.modelQuery.find(searchObject);
        return this;
    }

    sort(): this {
        const sortInfo = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sortInfo);
        // console.log("Inside the sort --> modelQuery ==>", this.modelQuery);
        return this;
    }

    skip(): this {
        const page = parseInt(this.query.page) || 1;
        const limit = parseInt(this.query.limit) || 5;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip);
        return this;
    }

    limit(): this {
        const limit = parseInt(this.query.limit) ||5;
        this.modelQuery = this.modelQuery.limit(limit);
        return this;
    }



    build() {
        return this.modelQuery
    }

    async getMetaData() {
        const page = parseInt(this.query.page) || 1;
        const limit = parseInt(this.query.limit) || 5;
        const skip = (page - 1) * limit;
        // const totalDocuments = await this.modelQuery.clone().countDocuments();
        const totalDocuments = await this.modelQuery.model.countDocuments();
        const totalPage = Math.ceil(totalDocuments / limit);

        return { totalDocuments, page, totalPage, limit, skip }

    }
}


