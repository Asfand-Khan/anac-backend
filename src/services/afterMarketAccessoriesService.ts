import { AfterMarketAccessories } from "../validations/afterMarketAccessoriesValidations";
import prisma from "../config/db";

export const allAfterMarketAccessories = async () => {
  try {
    return await prisma.aftermarketAccessory.findMany();
  } catch (error: any) {
    return error.message;
  }
};

export const createAfterMarketAccessories = async (
  input: AfterMarketAccessories
) => {
  try {
    return await prisma.aftermarketAccessory.create({ data: input });
  } catch (error: any) {
    return error.message;
  }
};
