import { z } from "zod";

const base64Regex = /^(data:[\w\-/]+;base64,)?([A-Za-z0-9+/=]|\r|\n)*$/;

export const validatePopularFeatureCreate = z.object({
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
    image: z
    .string({ required_error: "Image is required" })
    .regex(base64Regex, { message: "Invalid base64 string" })
    .trim()
    .min(3, { message: "Invalid base64 string" }),
});

export type PopularFeature = z.infer<typeof validatePopularFeatureCreate>;