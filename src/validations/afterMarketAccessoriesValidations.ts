import { z } from "zod";

export const validateAfterMarketAccessoriesCreate = z.object({
  label: z
    .string({ required_error: "Label is required" })
    .trim()
    .min(3, { message: "Label should be at least 3 characters" })
    .transform((value) =>
      value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    ),
});

export const validateSingleAftermarketAccParams = z.object({
  id: z.string({ required_error: "Aftermarket Accessory ID is required" }).trim().transform((id) => {
    if (parseInt(id) <= 0) throw new Error("Aftermarket Accessory must be a positive integer");
    if (isNaN(parseInt(id))) throw new Error("Invalid Aftermarket Accessory");
    return parseInt(id);
  }),
})

export type AfterMarketAccessories = z.infer<typeof validateAfterMarketAccessoriesCreate>;
export type SingleAfterMarketParam = z.infer<typeof validateSingleAftermarketAccParams>;