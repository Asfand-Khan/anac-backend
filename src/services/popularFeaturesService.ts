import prisma from "../config/db";
import {
  extractImageAndExtension,
  saveBase64Image,
} from "../utils/base64ToImage";
import { PopularFeature } from "../validations/popularFeatureValidations";

export const allPopularFeatures = async () => {
  try {
    return await prisma.popularFeature.findMany();
  } catch (error: any) {
    return error.message;
  }
};

export const createPopularFeature = async (input: PopularFeature) => {
  try {
    const { image, label } = input;
    const { image: imageBase64, extension } = extractImageAndExtension(image);
    
    const imageFileName = `${Date.now()}.${extension}`;
    const { success } = await saveBase64Image(imageBase64, imageFileName);
    if (!success) throw new Error("Failed to save user image");

    return await prisma.popularFeature.create({
      data: {
        image: imageFileName,
        label,
      },
    });
  } catch (error: any) {
    return error.message;
  }
};
