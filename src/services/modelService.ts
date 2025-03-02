import prisma from "../config/db";
import { ValidateModel } from "../validations/modelValidations";

export const allModels = async () => {
  try {
    return await prisma.carModel.findMany({
      select: {
        id: true,
        modelName: true,
        company: {
          select: {
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  } catch (error: any) {
    throw error;
  }
};

export const createModels = async (input: ValidateModel) => {
  try {
    return await prisma.carModel.create({
      data: {
        modelName: input.modelName,
        companyId: input.company,
      },
    });
  } catch (error: any) {
    throw error;
  }
};
