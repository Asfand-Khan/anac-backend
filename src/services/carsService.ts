// import prisma from "../config/db";
// import { Car, SingleCarParams } from "../validations/carsValidations";

// export const allCars = async (query?: any) => {
//   try {
//     // Build filters -- START
//     const filters: any = {};

//     if (query?.company) {
//       const companies = query.company.split(",");

//       const existingCompanies = await prisma.company.findMany({
//         where: {
//           name: { in: companies },
//         },
//       });

//       if (!existingCompanies.length) {
//         return "Company not found";
//       }

//       filters.company = {
//         name: { in: existingCompanies.map((company) => company.name) },
//       };
//     }

//     if (query?.model) {
//       const models = query.model.split(",");

//       const existingModels = await prisma.carModel.findMany({
//         where: {
//           modelName: { in: models },
//         },
//       });

//       if (!existingModels.length) {
//         return "Model not found";
//       }

//       filters.carModelId = {
//         in: existingModels.map((model) => model.id),
//       };
//     }

//     if (query?.bodyType) {
//       const bodyTypes = query.bodyType.split(",");

//       filters.bodyType = {
//         in: bodyTypes.map((bodyType: any) => bodyType),
//       };
//     }

//     if (query?.price) {
//       const priceRange = query.price
//         .split(",")
//         .map((p: any) => (p ? Number(p) : null));

//       const [minPrice, maxPrice] = priceRange;

//       filters.price = {};
//       if (minPrice !== null) {
//         filters.price.gte = minPrice; // Minimum price filter
//       }
//       if (maxPrice !== null) {
//         filters.price.lte = maxPrice; // Maximum price filter
//       }
//     }

//     if (query?.buildYear) {
//       const buildYearRange = query.buildYear
//         .split(",")
//         .map((p: any) => (p ? Number(p) : null));

//       const [minYear, maxYear] = buildYearRange;

//       filters.buildYear = {};
//       if (minYear !== null) {
//         filters.buildYear.gte = minYear; // Minimum build year filter
//       }
//       if (maxYear !== null) {
//         filters.buildYear.lte = maxYear; // Maximum build year filter
//       }
//     }

//     if (query?.mileageTravelled) {
//       const mileageTravelledRange = query.mileageTravelled
//         .split(",")
//         .map((p: any) => (p ? Number(p) : null));

//       const [minmileageTravelled, maxmileageTravelled] = mileageTravelledRange;

//       filters.mileageTravelled = {};
//       if (minmileageTravelled !== null) {
//         filters.mileageTravelled.gte = minmileageTravelled; // Minimum mileage filter
//       }
//       if (maxmileageTravelled !== null) {
//         filters.mileageTravelled.lte = maxmileageTravelled; // Maximum mileage filter
//       }
//     }

//     if (query?.fuelType) {
//       const fuelTypes = query.fuelType.split(",");

//       filters.fuelType = {
//         in: fuelTypes.map((fuelType: any) => fuelType),
//       };
//     }

//     if (query?.feature) {
//       const features = query.feature.split(",");

//       const existingFeatures = await prisma.standardFeature.findMany({
//         where: {
//           label: { in: features },
//         },
//       });

//       if (!existingFeatures.length) {
//         return "Feature not found";
//       }

//       filters.standardFeatures = {
//         some: {
//           standardFeatureId: {
//             in: existingFeatures.map((feature) => feature.id),
//           },
//         },
//       };
//     }

//     if (query?.transmission) {
//       const transmissions = query.transmission.split(",");

//       filters.transmission = {
//         in: transmissions.map((transmission: any) => transmission),
//       };
//     }

//     if (query?.driveTrain) {
//       const driveTrains = query.driveTrain.split(",");

//       filters.driveTrain = {
//         in: driveTrains.map((driveTrain: any) => driveTrain),
//       };
//     }

//     if (query?.seat) {
//       const seats = query.seat.split(",");

//       filters.seats = {
//         in: seats.map((seat: any) => Number(seat)),
//       };
//     }

//     if (query?.door) {
//       const doors = query.door.split(",");

//       filters.doors = {
//         in: doors.map((door: any) => Number(door)),
//       };
//     }

//     if (query?.color) {
//       const colors = query.color.split(",");

//       filters.exteriorColor = {
//         in: colors.map((color: any) => color),
//       };
//     }

//     if (query?.ancap) {
//       const ancap = Number(query.ancap);

//       filters.ancapSafetyRating = {};
//       if (ancap !== null) {
//         filters.ancapSafetyRating.gte = ancap; // Minimum ancap filter
//       }
//     }

//     if (query?.emissions) {
//       const emissions = Number(query.emissions);

//       filters.emissions = {};
//       if (emissions !== null) {
//         filters.emissions.gte = emissions; // Minimum emissions filter
//       }
//     }
//     // Build filters -- END

//     const cars = await prisma.car.findMany({
//       where: filters,
//       include: {
//         images: {
//           select: {
//             id: true,
//             image: true,
//           },
//         },
//         company: true,
//         carModel: {
//           select: {
//             id: true,
//             modelName: true,
//           },
//         },
//       },
//     });

//     return cars;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createCar = async (input: Car) => {
//   try {
//     const {
//       aftermarketAccessories,
//       ancapSafetyRating,
//       bodyType,
//       buildYear,
//       companyId,
//       modelId,
//       complianceYear,
//       cylinders,
//       driveTrain,
//       emissions,
//       enginePower,
//       engineSize,
//       exteriorColor,
//       fuelConsumption,
//       fuelTankCapacity,
//       fuelType,
//       images,
//       installedOptions,
//       keys,
//       odometer,
//       price,
//       seats,
//       tone,
//       transmission,
//       vin,
//       gearbox,
//       length,
//       weight,
//       mileageTravelled,
//       popularFeatures,
//       standardFeatures,
//       towingCapacityBraked,
//       serviceHistory,
//       doors,
//     } = input;

//     const car = await prisma.car.create({
//       data: {
//         companyId,
//         carModelId: modelId,
//         buildYear,
//         doors,
//         tone,
//         mileageTravelled,
//         fuelType,
//         transmission,
//         price,
//         complianceYear,
//         seats,
//         keys,
//         exteriorColor,
//         driveTrain,
//         engineSize,
//         enginePower,
//         vin,
//         bodyType,
//         odometer,
//         fuelTankCapacity,
//         fuelConsumption,
//         emissions,
//         ancapSafetyRating,
//         cylinders,
//         gearbox,
//         towingCapacityBraked,
//         weight,
//         length,
//       },
//     });

//     let imageArr: { image: string; carId: number }[] = [];

//     for (const image of images) {
//       //   const { image: imageBase64, extension } = extractImageAndExtension(image);

//       //   const imageFileName = `${Date.now()}.${extension}`;
//       //   const { success } = await saveBase64Image(imageBase64, imageFileName);
//       //   if (!success) throw new Error("Failed to save car images");

//       imageArr.push({ image: image, carId: car.id });
//     }

//     const afterMarketAccArr = aftermarketAccessories.map((id) => ({
//       aftermarketAccessoryId: id,
//       carId: car.id,
//     }));

//     const popularFeatureArr = popularFeatures.map((id) => ({
//       popularFeatureId: id,
//       carId: car.id,
//     }));

//     const installedOptionArr = installedOptions.map((id) => ({
//       installedOptionId: id,
//       carId: car.id,
//     }));

//     const standardFeatureArr = standardFeatures.map((id) => ({
//       standardFeatureId: id,
//       carId: car.id,
//     }));

//     await prisma.carImage.createMany({
//       data: imageArr,
//     });

//     await prisma.carAftermarketAccessory.createMany({
//       data: afterMarketAccArr,
//     });
//     await prisma.carPopularFeature.createMany({
//       data: popularFeatureArr,
//     });
//     await prisma.carInstalledOption.createMany({
//       data: installedOptionArr,
//     });
//     await prisma.carStandardFeature.createMany({
//       data: standardFeatureArr,
//     });

//     if (serviceHistory) {
//       const serviceHistoryArr = serviceHistory.map((service) => ({
//         carId: car.id,
//         date: new Date(service.date).toISOString(),
//         mileageTravelled: service.mileageTravelled,
//       }));

//       await prisma.serviceHistory.createMany({
//         data: serviceHistoryArr,
//       });
//     }

//     return car;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getCar = async (input: SingleCarParams) => {
//   try {
//     const car = await prisma.car.findUnique({
//       where: input,
//       include: {
//         images: true,
//         carModel: true,
//         company: true,
//         popularFeatures: {
//           select: {
//             popularFeature: true,
//           },
//         },
//         installedOptions: {
//           select: {
//             installedOption: true,
//           },
//         },
//         aftermarketAccessories: {
//           select: {
//             aftermarketAccessory: true,
//           },
//         },
//         standardFeatures: {
//           select: {
//             standardFeature: true,
//           },
//         },
//         serviceHistory: true,
//       },
//     });

//     if (!car) throw new Error("Car not found");

//     return car;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateCar = async (input: Car, params: SingleCarParams) => {
//   try {
//     const {
//       aftermarketAccessories,
//       ancapSafetyRating,
//       bodyType,
//       buildYear,
//       companyId,
//       modelId,
//       complianceYear,
//       cylinders,
//       driveTrain,
//       emissions,
//       enginePower,
//       engineSize,
//       exteriorColor,
//       fuelConsumption,
//       fuelTankCapacity,
//       fuelType,
//       images,
//       installedOptions,
//       keys,
//       odometer,
//       price,
//       seats,
//       tone,
//       transmission,
//       vin,
//       gearbox,
//       length,
//       weight,
//       mileageTravelled,
//       popularFeatures,
//       standardFeatures,
//       towingCapacityBraked,
//       serviceHistory,
//       doors,
//     } = input;

//     const car = await prisma.car.update({
//       where: params,
//       data: {
//         companyId,
//         carModelId: modelId,
//         buildYear,
//         doors,
//         tone,
//         mileageTravelled,
//         fuelType,
//         transmission,
//         price,
//         complianceYear,
//         seats,
//         keys,
//         exteriorColor,
//         driveTrain,
//         engineSize,
//         enginePower,
//         vin,
//         bodyType,
//         odometer,
//         fuelTankCapacity,
//         fuelConsumption,
//         emissions,
//         ancapSafetyRating,
//         cylinders,
//         gearbox,
//         towingCapacityBraked,
//         weight,
//         length,
//       },
//     });

//     // Handle Car Images
//     if (images.length > 0) {
//       await prisma.carImage.deleteMany({
//         where: { carId: car.id },
//       });
//       let imageArr: { image: string; carId: number }[] = [];
//       for (const image of images) {
//         imageArr.push({ image: image, carId: car.id });
//       }
//       await prisma.carImage.createMany({
//         data: imageArr,
//       });
//     }

//     // Handle Car Aftermarket Accessories
//     if(aftermarketAccessories.length > 0) {
//       await prisma.carAftermarketAccessory.deleteMany({
//         where: { carId: car.id },
//       });
//       const afterMarketAccArr = aftermarketAccessories.map((id) => ({
//         aftermarketAccessoryId: id,
//         carId: car.id,
//       }));
//       await prisma.carAftermarketAccessory.createMany({
//         data: afterMarketAccArr,
//       })
//     }

//     // Handle Car Popular Features
//     if(popularFeatures.length > 0) {
//       await prisma.carPopularFeature.deleteMany({
//         where:{ carId: car.id },
//       });
//       const popularFeatureArr = popularFeatures.map((id) => ({
//         popularFeatureId: id,
//         carId: car.id,
//       }));
//       await prisma.carPopularFeature.createMany({
//         data: popularFeatureArr,
//       });
//     }
    
//     // Handle Car Installed Options
//     if(installedOptions.length > 0){
//       await prisma.carInstalledOption.deleteMany({
//         where: { carId: car.id },
//       });
//       const installedOptionArr = installedOptions.map((id) => ({
//         installedOptionId: id,
//         carId: car.id,
//       }));
//       await prisma.carInstalledOption.createMany({
//         data: installedOptionArr,
//       });
//     }

//     // Handle Car Standard Features
//     if(standardFeatures.length > 0){
//       await prisma.carStandardFeature.deleteMany({
//         where: { carId: car.id },
//       });
//       const standardFeatureArr = standardFeatures.map((id) => ({
//         standardFeatureId: id,
//         carId: car.id,
//       }));
//       await prisma.carStandardFeature.createMany({
//         data: standardFeatureArr,
//       });
//     }

//     // Handle Car Service History
//     if (serviceHistory) {
//       await prisma.serviceHistory.deleteMany({
//         where: { carId: car.id },
//       })
//       const serviceHistoryArr = serviceHistory.map((service) => ({
//         carId: car.id,
//         date: new Date(service.date).toISOString(),
//         mileageTravelled: service.mileageTravelled,
//       }));
//       await prisma.serviceHistory.createMany({
//         data: serviceHistoryArr,
//       });
//     }

//     return await getCar({ id: params.id });
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteCar = async (input: SingleCarParams) => {
//   try {
//     const car = await prisma.car.findUnique({
//       where: input,
//     });

    
//     if (!car) throw new Error("Car not found");
    
//     await prisma.carImage.deleteMany({
//       where: { carId: car.id },
//     });
//     await prisma.carPopularFeature.deleteMany({
//       where: { carId: car.id },
//     })
//     await prisma.carInstalledOption.deleteMany({
//       where: { carId: car.id },
//     });
//     await prisma.carAftermarketAccessory.deleteMany({
//       where: { carId: car.id },
//     })
//     await prisma.carStandardFeature.deleteMany({
//       where: { carId: car.id },
//     });
//     await prisma.serviceHistory.deleteMany({
//       where: { carId: car.id },
//     });
//     await prisma.car.delete({
//       where: input,
//     });

//     return car;
//   } catch (error) {
//     throw error;
//   }
// };