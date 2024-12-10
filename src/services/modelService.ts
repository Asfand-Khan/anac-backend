import prisma from "../config/db";
import { ValidateModel } from "../validations/modelValidations";

export const allModels = async () => {
    try {
        return await prisma.carModel.findMany();
    } catch (error: any) {
        return error.message;
    }
};

export const createModels = async (input: ValidateModel) => {
    try {
        return await prisma.carModel.create({ data: {
            modelName: input.modelName,
            companyId: input.company
        }});
    } catch (error: any) {
        return error.message;
    }
};