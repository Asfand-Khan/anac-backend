import prisma from "../config/db";
import { ValidateCompany } from "../validations/companyValidations";

export const allCompanies = async () => {
    try {
        return await prisma.company.findMany();
    } catch (error: any) {
        return error.message;
    }
};

export const createCompanies = async (input: ValidateCompany) => {
    try {
        return await prisma.company.create({ data: input });
    } catch (error: any) {
        return error.message;
    }
};