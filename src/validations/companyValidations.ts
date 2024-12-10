import { z } from "zod";

export const validateCompanyCreate = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, { message: "name should be at least 3 characters" })
    .toUpperCase(),
});

export type ValidateCompany = z.infer<typeof validateCompanyCreate>;