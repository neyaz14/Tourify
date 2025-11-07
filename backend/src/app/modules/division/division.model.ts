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
      unique: true,
    },
    thumbnail: {
      type: String,

    },
    description: {
      type: String,

    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);


divisionSchema.pre("save", async function (next) {
  console.log("Inside the divisionPreSave hook ==>", this);
  if (this.isModified("name")) {
    const baseSlug = this.name?.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-division`;

    let counter = 0;
    while (await Division.exists({ slug })) {
      slug = `${slug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
})

divisionSchema.pre("findOneAndUpdate", async function (next) {
  // ? we will  be able to access the division object through this.getUpdate(), here only this - is a query object
  const division = this.getUpdate() as Partial<IDivision>;

  console.log("Inside the divisionPreSave hook ==>", this);
  if (division.name) {
    const baseSlug = division.name?.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-division`;

    let counter = 0;
    while (await Division.exists({ slug })) {
      slug = `${slug}-${counter++}`;
    }

    division.slug = slug;
  }
  // last e jei oobject update korbo ta setUpdate er modde dibo
  this.setUpdate(division)
  next()
})

export const Division = model<IDivision>("Division", divisionSchema);
