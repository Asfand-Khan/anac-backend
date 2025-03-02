import {
  AfterMarketAccessories,
  SingleAfterMarketParam,
} from "../validations/afterMarketAccessoriesValidations";
import prisma from "../config/db";

export const allAfterMarketAccessories = async () => {
  try {
    return await prisma.aftermarketAccessory.findMany();
  } catch (error) {
    throw error;
  }
};

export const createAfterMarketAccessories = async (
  input: AfterMarketAccessories
) => {
  try {
    return await prisma.aftermarketAccessory.create({ data: input });
  } catch (error) {
    throw error;
  }
};

export const getAftermarketAccessory = async (
  input: SingleAfterMarketParam
) => {
  try {
    const acc = await prisma.aftermarketAccessory.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!acc){
      throw new Error("Aftermarket Accessory not found!")
    }

    return acc;
  } catch (error) {
    throw error;
  }
};

export const updateAfterMarketAccessory = async (
  input: AfterMarketAccessories,
  params: SingleAfterMarketParam
) => {
  try {
    const updatedAcc = await prisma.aftermarketAccessory.update({
      where: {
        id: params.id,
      },
      data: {
        label: input.label,
      },
    });

    return updatedAcc;
  } catch (error) {
    throw error;
  }
};

export const deleteAfterMarketAccessory = async (
  input: SingleAfterMarketParam
) => {
  try {
    const acc = await prisma.aftermarketAccessory.findUnique({
      where: input,
    });

    if (!acc) throw new Error("Aftermarket Accessory not found");

    await prisma.aftermarketAccessory.delete({
      where: {
        id: input.id,
      },
    });

    return acc;
  } catch (error) {
    throw error;
  }
};
