import prisma from "../config/db";
import { StandardFeatures } from "../validations/standardFeatureValidations";

export const allStandardFeatures = async () => {
  try {
    return await prisma.standardFeature.findMany();
  } catch (error: any) {
    throw error;
  }
};

export const createStandardFeatures = async (input: StandardFeatures) => {
  try {
    return await prisma.standardFeature.create({ data: input });
  } catch (error: any) {
    throw error;
  }
};
