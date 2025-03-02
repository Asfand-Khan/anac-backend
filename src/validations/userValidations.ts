import { z } from "zod";

// Base64 regex for validating base64 strings
const base64Regex = /^(data:[\w\-/]+;base64,)?([A-Za-z0-9+/=]|\r|\n)*$/;

export const validateUserRegister = z.object({
  fullname: z
    .string({ required_error: "Fullname is required" })
    .trim()
    .min(3, { message: "Fullname should be at least 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  username: z
    .string({ required_error: "Username is required" })
    .toLowerCase()
    .trim()
    .min(3, { message: "Username should be at least 3 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" })
    .trim(),
  phone: z
    .string({ required_error: "Contact number is required" })
    .max(11, { message: "Contact number should not exceed 11 characters" })
    .min(11, { message: "Contact number should be at least 11 characters" })
    .trim(),
  image: z
    .string()
    .regex(base64Regex, { message: "Invalid base64 string" })
    .optional(),
  menuRights: z.array(
    z.object({
      menuId: z.number(),
      canView: z.boolean().default(true),
      canCreate: z.boolean().default(false),
      canEdit: z.boolean().default(false),
      canDelete: z.boolean().default(false),
    }),
    { required_error: "Menu rights are required" }
  ).min(1, { message: "At least one menu right is required" }),
});

export const validateUserLogin = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .toLowerCase()
    .trim()
    .min(3, { message: "Username should be at least 3 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" })
    .trim(),
});

export const validateEmailOtp = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
});

export const validateEmailedOtp = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  otp: z
    .string({ required_error: "OTP is required" })
    .trim()
    .min(6, { message: "OTP should be 6 digits" })
    .max(6, { message: "OTP should be 6 digits" }),
});

export const validateSingleUserParams = z.object({
  id: z.string({ required_error: "User ID is required" }).trim().transform((id) => {
    if (parseInt(id) <= 0) throw new Error("User ID must be a positive integer");
    if (isNaN(parseInt(id))) throw new Error("Invalid User ID");
    return parseInt(id);
  }),
})

export type EmailedOtp = z.infer<typeof validateEmailedOtp>;
export type EmailOtp = z.infer<typeof validateEmailOtp>;
export type UserLogin = z.infer<typeof validateUserLogin>;
export type UserRegister = z.infer<typeof validateUserRegister>;
export type SingleUserParam = z.infer<typeof validateSingleUserParams>;
