import { z } from "zod";

export const validateModelCreate = z.object({
  modelName: z
    .string({ required_error: "Model name is required" })
    .trim()
    .min(3, { message: "Model name should be at least 3 characters" })
    .toUpperCase(),
  company: z.number({ required_error: "Company is required" }),
});

export type ValidateModel = z.infer<typeof validateModelCreate>;