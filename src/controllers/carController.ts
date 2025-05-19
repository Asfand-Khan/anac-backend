// import { Request, Response } from "express";
// import prisma from "../config/db";
// import { z } from "zod";
// import {
//   validateCarCreate,
//   validateSingleCarParams,
// } from "../validations/carsValidations";
// import {
//   allCars,
//   createCar,
//   deleteCar,
//   getCar,
//   updateCar,
// } from "../services/carsService";

// export const getAllCarsHandler = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const query = req.query;
//     const cars = await allCars(query);
//     return res.status(200).json({
//       status: "1",
//       message: "Success: All Cars Fetched",
//       payload: cars,
//     });
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: error.errors[0].message,
//         payload: [],
//         status: "0",
//       });
//     }

//     return res.status(500).json({
//       message: `${error.message}`,
//       payload: [],
//       status: "0",
//     });
//   }
// };

// export const createCarsHandler = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const parsedCar = validateCarCreate.parse(req.body);
//     const car = await createCar(parsedCar);
//     return res.status(201).json({
//       succes: "1",
//       message: "Success: Car Created",
//       payload: car,
//     });
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: error.errors[0].message,
//         payload: [],
//         status: "0",
//       });
//     }

//     return res.status(500).json({
//       message: `${error.message}`,
//       payload: [],
//       status: "0",
//     });
//   }
// };

// export const getSingleCarHandler = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const params = req.params;
//     const parsedData = validateSingleCarParams.parse(params);
//     const car = await getCar(parsedData);
//     return res.status(200).json({
//       message: "Success: Car Fetched",
//       payload: car,
//       success: "1",
//     });
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: error.errors[0].message,
//         payload: [],
//         status: "0",
//       });
//     }

//     return res.status(500).json({
//       message: `${error.message}`,
//       payload: [],
//       status: "0",
//     });
//   }
// };

// export const updateCarHandler = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const parsedParams = validateSingleCarParams.parse(req.params);
//     const parsedCar = validateCarCreate.parse(req.body);
//     const car = await updateCar(parsedCar, parsedParams);
//     return res.status(200).json({
//       message: "Success: Car Updated",
//       payload: car,
//       success: "1",
//     });
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: error.errors[0].message,
//         payload: [],
//         status: "0",
//       });
//     }

//     return res.status(500).json({
//       message: `${error.message}`,
//       payload: [],
//       status: "0",
//     });
//   }
// };

// export const deleteCarHandler = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const parsedParams = validateSingleCarParams.parse(req.params);
//     const car = await deleteCar(parsedParams);
//     return res.status(200).json({
//       message: "Success: Car Deleted",
//       payload: car,
//       success: "1",
//     });
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: error.errors[0].message,
//         payload: [],
//         status: "0",
//       });
//     }

//     return res.status(500).json({
//       message: `${error.message}`,
//       payload: [],
//       status: "0",
//     });
//   }
// };
