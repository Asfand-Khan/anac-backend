import prisma from "../config/db";
import { InstalledOption } from "../validations/installedOptionValidations";

export const allInstalledOptions = async () => {
    try {
        return await prisma.installedOption.findMany();
    } catch (error) {
        throw error;
    }
};

export const createInstalledOptions = async (input: InstalledOption) => {
    try {
        return await prisma.installedOption.create({ data: input });
    } catch (error) {
        throw error;
    }
};