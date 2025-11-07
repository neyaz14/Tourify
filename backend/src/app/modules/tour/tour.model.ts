import { Schema, model } from "mongoose";
import { ITour, ITourType } from "./tour.interface";


const tourTypeSchema = new Schema<ITourType>({
  name: { type: String, required: true, unique: true }
}, {
  timestamps: true
})

export const TourType = model<ITourType>("TourType", tourTypeSchema)

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true
    },
  
  },
  {
    timestamps: true,
  }
);


tourSchema.pre("save", async function (next) {
  console.log("Inside the TourPreSave hook ==>", this);
  if (this.isModified("title")) {
    const baseSlug = this.title?.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-tour`;

    let counter = 0;
    while (await Tour.exists({ slug })) {
      slug = `${slug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
})

tourSchema.pre("findOneAndUpdate", async function (next) {
  // ? we will  be able to access the division object through this.getUpdate(), here only this - is a query object
  const tour = this.getUpdate() as Partial<ITour>;

  console.log("Inside the tourPreSave hook ==>", this);
  if (tour.title) {
    const baseSlug = tour.title?.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-tour`;

    let counter = 0;
    while (await Tour.exists({ slug })) {
      slug = `${slug}-${counter++}`;
    }

    tour.slug = slug;
  }
  // last e jei oobject update korbo ta setUpdate er modde dibo
  this.setUpdate(tour)
  next()
})

export const Tour = model<ITour>("Tour", tourSchema);
