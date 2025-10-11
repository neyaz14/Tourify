import { model, Schema } from "mongoose";
import { IUser, Role, IAuthProviders, IsActive } from "./user.interface";

const authProviderSchema = new Schema<IAuthProviders>({
    providerId: {type: String, required: true},
    providers: {type: String, required: true}
},{versionKey: false, _id: false})


const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.User
        },
        phone: { type: String },
        picture: { type: String },
        address: { type: String },


        isVerified: {
            type: Boolean,
            default: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        auths: [authProviderSchema],

        

        isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.Active,
        },





    }, {
    timestamps: true,
    versionKey: false
}
)

export const User = model<IUser>("User", userSchema)

/**
 * bookings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Booking",
            },
        ],

        guides: [
            {
                type: Schema.Types.ObjectId,
                ref: "Guide",
            },
        ],
 * */ 