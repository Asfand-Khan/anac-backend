import { z } from "zod";

// Base64 regex for validating base64 strings
const base64Regex = /^(data:[\w\-/]+;base64,)?([A-Za-z0-9+/=]|\r|\n)*$/;

export const validateUserRegister = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .toLowerCase()
    .trim()
    .min(3, { message: "Username should be at least 3 characters" }),
  fullname: z
    .string({ required_error: "Fullname is required" })
    .trim()
    .min(3, { message: "Fullname should be at least 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  contact: z
    .string({ required_error: "Contact number is required" })
    .max(11, { message: "Contact number should not exceed 11 characters" })
    .min(11, { message: "Contact number should be at least 11 characters" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" })
    .trim(),
  image: z
    .string()
    .regex(base64Regex, { message: "Invalid base64 string" })
    .optional(),
  isActive: z.boolean().default(true),
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

export type EmailedOtp = z.infer<typeof validateEmailedOtp>;
export type EmailOtp = z.infer<typeof validateEmailOtp>;
export type UserLogin = z.infer<typeof validateUserLogin>;
export type UserRegister = z.infer<typeof validateUserRegister>;
