import { z } from "zod";

export const validateCustomer = z.object({
  customer_code: z
    .string({ required_error: "Customer code is required" })
    .trim()
    .min(3, { message: "Customer code must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Customer code must be alphanumeric" }),
  customer_name: z
    .string({ required_error: "Customer name is required" })
    .trim()
    .min(3, { message: "Customer name must be at least 3 characters" })
    .transform((value) =>
      value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    ),
  contact_no: z
    .string({ required_error: "Contact number is required" })
    .trim()
    .min(7, { message: "Contact number must be at least 7 digits" })
    .max(15, { message: "Contact number must be at most 15 digits" })
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: "Contact number must be a valid phone number",
    }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(5, { message: "Address must be at least 5 characters" }),
  contact_person: z
    .string()
    .trim()
    .min(3, { message: "Contact person must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
});

export const validateCustomerParams = z.object({
  id: z
    .string({ required_error: "Customer ID is required" })
    .trim()
    .transform((id) => {
      const parsed = parseInt(id);
      if (isNaN(parsed)) throw new Error("Invalid Customer ID");
      if (parsed <= 0) throw new Error("Customer ID must be a positive integer");
      return parsed;
    }),
});

export type Customer = z.infer<typeof validateCustomer>;
export type CustomerParam = z.infer<typeof validateCustomerParams>;