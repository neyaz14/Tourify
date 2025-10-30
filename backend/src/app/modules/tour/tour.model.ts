import { Schema, model } from "mongoose";
import { ITour, ITourType } from "./tour.interface";


const tourTypeSchema = new Schema<ITourType>({
  name: { type: String, required: true, unique: true }
},{
  timestamps: true
})

export const TourType = model<ITourType>("TourType", tourTypeSchema)

const tourSchema = new Schema<ITour>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: String,
    thumbnail: String,
    images: [String],
    location: String,
    costFrom: {
      type: Number,
      min: [0, "Cost cannot be negative"],
    },
    startDate: Date,
    endDate: Date,
    include: [String],
    exclude: [String],
    amenities: [String],
    tourPlan: [String],
    maxGuest: {
      type: Number,
      min: [1, "Guest count must be at least 1"],
    },
    minAge: {
      type: Number,
      min: [0, "Age cannot be negative"],
    },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: [true, "Division is required"],
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: [true, "Tour Type is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ! explore this 
// // ✅ Auto-generate slug if not provided
// tourSchema.pre("save", function (next) {
//   if (!this.slug && this.title) {
//     this.slug = this.title.toLowerCase().replace(/\s+/g, "-");
//   }
//   next();
// });

export const Tour = model<ITour>("Tour", tourSchema);
