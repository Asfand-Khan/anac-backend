import { Request, Response } from "express";
import prisma from "../config/db";
import { z } from "zod";
import { validateCarCreate } from "../validations/carsValidations";
import { allCars, createCar } from "../services/carsService";

export const getAllCarsHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const cars = await allCars();
    return res.status(200).json({
      message: "Success: All Cars Fetched",
      cars,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Fetching Cars",
      error: error.message,
    });
  }
};


export const createCarsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedCar = validateCarCreate.parse(req.body);
    const car = await createCar(parsedCar);
    return res.status(201).json({
      message: "Success: Car Created",
      car,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Creating Car",
      error: error.message,
    });
  }
};