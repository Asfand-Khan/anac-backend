import prisma from "../config/db";
import {
  extractImageAndExtension,
  saveBase64Image,
} from "../utils/base64ToImage";
import { Car } from "../validations/carsValidations";

export const allCars = async () => {
  try {
    // include:{
    //     images: true,
    //     popularFeatures: true,
    //     installedOptions: true,
    //     aftermarketAccessories: true,
    //     standardFeatures: true,
    //     serviceHistory: true,
    //     company: {
    //         include: {
    //             carModels: true
    //         }
    //     }
    // }
    return await prisma.car.findMany({
      include: {
        images: true,
        company: {
          include: {
            carModels: true,
          },
        },
      },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const createCar = async (input: Car) => {
  try {
    const {
      aftermarketAccessories,
      ancapSafetyRating,
      bodyType,
      buildYear,
      companyId,
      complianceYear,
      cylinders,
      driveTrain,
      emissions,
      enginePower,
      engineSize,
      exteriorColor,
      fuelConsumption,
      fuelTankCapacity,
      fuelType,
      // images,
      installedOptions,
      keys,
      odometer,
      price,
      seats,
      tone,
      transmission,
      vin,
      gearbox,
      length,
      weight,
      mileageTravelled,
      popularFeatures,
      standardFeatures,
      towingCapacityBraked,
      serviceHistory,
    } = input;

    const car = await prisma.car.create({
      data: {
        companyId,
        buildYear,
        tone,
        mileageTravelled,
        fuelType,
        transmission,
        price,
        complianceYear,
        seats,
        keys,
        exteriorColor,
        driveTrain,
        engineSize,
        enginePower,
        vin,
        bodyType,
        odometer,
        fuelTankCapacity,
        fuelConsumption,
        emissions,
        ancapSafetyRating,
        cylinders,
        gearbox,
        towingCapacityBraked,
        weight,
        length,
      }
    });

    // let imageArr: {image: string, carId: number}[] = [];

    // for (const image of images) {
    //   const { image: imageBase64, extension } = extractImageAndExtension(image);

    //   const imageFileName = `${Date.now()}.${extension}`;
    //   const { success } = await saveBase64Image(imageBase64, imageFileName);
    //   if (!success) throw new Error("Failed to save car images");

    //   imageArr.push({image:imageFileName, carId: car.id});
    // }

    const afterMarketAccArr = aftermarketAccessories.map((id) => ({
      aftermarketAccessoryId: id,
      carId: car.id,
    }));

    const popularFeatureArr = popularFeatures.map((id) => ({
      popularFeatureId: id,
      carId: car.id,
    }));

    const installedOptionArr = installedOptions.map((id) => ({
      installedOptionId: id,
      carId: car.id,
    }));

    const standardFeatureArr = standardFeatures.map((id) => ({
      standardFeatureId: id,
      carId: car.id,
    }));

    // await prisma.carImage.createMany({
    //   data: imageArr
    // })

    await prisma.carAftermarketAccessory.createMany({
      data: afterMarketAccArr,
    });
    await prisma.carPopularFeature.createMany({
      data: popularFeatureArr,
    });
    await prisma.carInstalledOption.createMany({
      data: installedOptionArr,
    });
    await prisma.carStandardFeature.createMany({
      data: standardFeatureArr,
    });

    if (serviceHistory) {
      const serviceHistoryArr = serviceHistory.map((service) => ({
        carId: car.id,
        date: new Date(service.date).toISOString(),
        mileageTravelled: service.mileageTravelled
      }))

      await prisma.serviceHistory.createMany({
        data: serviceHistoryArr,
      });
    }

    return car;
  } catch (error: any) {
    return error.message;
  }
};
