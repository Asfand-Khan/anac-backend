import { z } from "zod";

export const validateMachine = z.object({
  machine_kind: z
    .string({ required_error: "Machine kind is required" })
    .trim()
    .min(3, { message: "Machine kind must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Machine kind must be alphanumeric" }),
  machine_make: z
    .string({ required_error: "Machine make is required" })
    .trim()
    .min(3, { message: "Machine make must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Machine make must be alphanumeric" }),
  machine_type: z
    .string({ required_error: "Machine type is required" })
    .trim()
    .min(3, { message: "Machine type must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Machine type must be alphanumeric" }),
  other_machine_make: z
    .string()
    .trim()
    .min(3, { message: "Other machine make must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  other_machine_type: z
    .string()
    .trim()
    .min(3, { message: "Other machine type must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  machine_info1: z
    .string()
    .trim()
    .min(3, { message: "Machine info1 must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  machine_info2: z
    .string()
    .trim()
    .min(3, { message: "Machine info2 must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  machine_id: z
    .string()
    .trim()
    .min(3, { message: "Machine ID must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Machine ID must be alphanumeric" })
    .optional()
    .or(z.literal("")),
  unit_id: z
    .string({ required_error: "Unit ID is required" })
    .trim()
    .transform((id) => {
      const parsed = parseInt(id);
      if (isNaN(parsed)) throw new Error("Invalid Unit ID");
      if (parsed <= 0) throw new Error("Unit ID must be a positive integer");
      return parsed;
    }),
  customer_id: z
    .string({ required_error: "Customer ID is required" })
    .trim()
    .transform((id) => {
      const parsed = parseInt(id);
      if (isNaN(parsed)) throw new Error("Invalid Customer ID");
      if (parsed <= 0) throw new Error("Customer ID must be a positive integer");
      return parsed;
    }),
});

export const validateMachineParams = z.object({
  id: z
    .string({ required_error: "Machine ID is required" })
    .trim()
    .transform((id) => {
      const parsed = parseInt(id);
      if (isNaN(parsed)) throw new Error("Invalid Machine ID");
      if (parsed <= 0) throw new Error("Machine ID must be a positive integer");
      return parsed;
    }),
});

export type Machine = z.infer<typeof validateMachine>;
export type MachineParam = z.infer<typeof validateMachineParams>;