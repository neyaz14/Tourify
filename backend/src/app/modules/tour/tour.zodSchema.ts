import { z } from "zod";


export const tourZodSchema = z
    .object({
        title: z.string({ required_error: "Title is required" }),
        slug: z.string({ required_error: "Slug is required" }),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        images: z.array(z.string()).optional(),
        location: z.string().optional(),
        costFrom: z.number().positive("Cost must be positive").optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        include: z.array(z.string()).optional(),
        exclude: z.array(z.string()).optional(),
        amenities: z.array(z.string()).optional(),
        tourPlan: z.string().optional(),
        maxGuest: z.number().positive("Guest count must be positive").optional(),
        minAge: z.number().positive("Age must be positive").optional(),
        
        division: z.string({ required_error: "Division ID is required" }),
        tourType: z.string({ required_error: "Tour Type ID is required" }),
    });

// ! explore this 
//   .superRefine(async (data, ctx) => {
//     // 🔍 Check for unique title
//     const existingTitle = await Tour.findOne({ title: data.title });
//     if (existingTitle) {
//       ctx.addIssue({
//         path: ["title"],
//         message: "Title must be unique",
//         code: z.ZodIssueCode.custom,
//       });
//     }

//     // 🔍 Check for unique slug
//     const existingSlug = await Tour.findOne({ slug: data.slug });
//     if (existingSlug) {
//       ctx.addIssue({
//         path: ["slug"],
//         message: "Slug must be unique",
//         code: z.ZodIssueCode.custom,
//       });
//     }
//   });

// export type ITour = z.infer<typeof tourZodSchema>;
