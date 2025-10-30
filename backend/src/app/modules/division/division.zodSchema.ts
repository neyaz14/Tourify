import z from "zod";

export const divisionZodSchema = z.object({
  name: z.string({ required_error: "Division name is required" }),
  slug: z.string({ required_error: "Slug is required" }),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

