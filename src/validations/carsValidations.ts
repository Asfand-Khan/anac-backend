import { z } from "zod";

const base64Regex = /^(data:[\w\-/]+;base64,)?([A-Za-z0-9+/=]|\r|\n)*$/;

export const validateCarCreate = z.object({
  buildYear: z
    .number({ required_error: "Build year is required" })
    .int()
    .min(1900, { message: "Build year must be at least 1900" })
    .max(new Date().getFullYear(), {
      message: "Build year cannot be in the future",
    }),

  tone: z
    .string({ required_error: "Tone is required" })
    .trim()
    .min(1, { message: "Tone cannot be empty" }),

  mileageTravelled: z
    .number({ required_error: "Mileage travelled is required" })
    .positive({ message: "Mileage must be a positive number" }),

  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"], {
    errorMap: () => ({
      message: "Fuel type must be one of: petrol, diesel, electric, or hybrid",
    }),
  }),

  transmission: z.enum(["manual", "automatic"], {
    errorMap: () => ({
      message: "Transmission must be either 'manual' or 'automatic'",
    }),
  }),

  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" }),

  complianceYear: z
    .number({ required_error: "Compliance year is required" })
    .int()
    .min(1900, { message: "Compliance year must be at least 1900" })
    .max(new Date().getFullYear(), {
      message: "Compliance year cannot be in the future",
    }),

  seats: z
    .number({ required_error: "Seats are required" })
    .int()
    .positive({ message: "Seats must be a positive integer" }),

  keys: z
    .number({ required_error: "Keys count is required" })
    .int()
    .min(0, { message: "Keys cannot be a negative number" }),

  exteriorColor: z
    .string({ required_error: "Exterior color is required" })
    .trim()
    .min(1, { message: "Exterior color cannot be empty" }),

  driveTrain: z
    .string({ required_error: "Drive train is required" })
    .trim()
    .min(1, { message: "Drive train cannot be empty" }),

  engineSize: z
    .number({ required_error: "Engine size is required" })
    .positive({ message: "Engine size must be a positive number" }),

  enginePower: z
    .number({ required_error: "Engine power is required" })
    .positive({ message: "Engine power must be a positive number" }),

  vin: z
    .string({ required_error: "VIN is required" })
    .trim()
    .min(10, { message: "VIN must be at least 10 characters" })
    .max(17, { message: "VIN cannot exceed 17 characters" }),

  bodyType: z
    .string({ required_error: "Body type is required" })
    .trim()
    .min(1, { message: "Body type cannot be empty" }),

  odometer: z
    .number({ required_error: "Odometer reading is required" })
    .positive({ message: "Odometer reading must be positive" }),

  fuelTankCapacity: z
    .number({ required_error: "Fuel tank capacity is required" })
    .positive({ message: "Fuel tank capacity must be positive" }),

  fuelConsumption: z
    .number({ required_error: "Fuel consumption is required" })
    .positive({ message: "Fuel consumption must be positive" }),

  emissions: z
    .number({ required_error: "Emissions data is required" })
    .nonnegative({ message: "Emissions cannot be negative" }),

  ancapSafetyRating: z
    .number({ required_error: "ANCAP safety rating is required" })
    .int()
    .min(0, { message: "ANCAP rating cannot be negative" })
    .max(5, { message: "ANCAP rating cannot exceed 5" }),

  cylinders: z
    .number({ required_error: "Cylinders count is required" })
    .int()
    .positive({ message: "Cylinders count must be positive" }),

  gearbox: z
    .string({ required_error: "Gearbox information is required" })
    .trim()
    .min(1, { message: "Gearbox cannot be empty" }),

  towingCapacityBraked: z
    .number({ required_error: "Towing capacity is required" })
    .positive({ message: "Towing capacity must be positive" }),

  weight: z
    .number({ required_error: "Weight is required" })
    .positive({ message: "Weight must be a positive number" }),

  length: z
    .number({ required_error: "Length is required" })
    .positive({ message: "Length must be a positive number" }),

  // images: z
  //   .array(z.string().regex(base64Regex, { message: "Invalid base64 image" }))
  //   .min(1, { message: "At least one image is required" }),

  companyId: z
    .number({ required_error: "Company ID is required" })
    .int()
    .positive({ message: "Company ID must be a positive integer" }),

  popularFeatures: z.array(
    z
      .number()
      .int()
      .positive({ message: "Popular feature ID must be a positive integer" })
  ),
  installedOptions: z.array(
    z
      .number()
      .int()
      .positive({ message: "Installed option ID must be a positive integer" })
  ),
  aftermarketAccessories: z.array(
    z
      .number()
      .int()
      .positive({
        message: "After market accessory ID must be a positive integer",
      })
  ),
  standardFeatures: z.array(
    z
      .number()
      .int()
      .positive({ message: "Standard feature ID must be a positive integer" })
  ),
  serviceHistory: z
    .array(
      z.object({
        date: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
        mileageTravelled: z
          .number({ required_error: "Mileage is required" })
          .positive({ message: "Mileage must be positive" }),
      })
    )
    .optional(),
});

export type Car = z.infer<typeof validateCarCreate>;
