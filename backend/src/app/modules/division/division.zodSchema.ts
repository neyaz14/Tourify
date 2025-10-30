import z from "zod";

export const createDivisionZodSchema = z.object({
  name: z.string({ required_error: "Division name is required" }).min(2, { message: "Name must be at least 2 characters long" }),
  slug: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

export const updateDivisionZodSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }).optional(),
  thumbnail: z.string().optional(),
  desciption: z.string().optional()
})