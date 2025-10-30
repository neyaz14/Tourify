import { Schema, model } from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>(
  {
    name: {
      type: String,
      required: [true, "Division name is required"],
      trim: true,
      unique: true
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Division = model<IDivision>("Division", divisionSchema);
