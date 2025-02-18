import { Request, Response } from "express";
import prisma from "../config/db";
import { z } from "zod";
import { validateCarCreate, validateSingleCarParams } from "../validations/carsValidations";
import { allCars, createCar, deleteCar, getCar, updateCar } from "../services/carsService";

export const getAllCarsHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = req.query;
    const cars = await allCars(query);
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

export const getSingleCarHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const params = req.params;
    const parsedData = validateSingleCarParams.parse(params);
    const car = await getCar(parsedData);
    return res.status(200).json({
      message: "Success: Car Fetched",
      car,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Fetching Single Car",
      error: error.message,
    });
  }
};

export const updateCarHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateSingleCarParams.parse(req.params);
    const parsedCar = validateCarCreate.parse(req.body);
    const car = await updateCar(parsedCar,parsedParams);
    return res.status(200).json({
      message: "Success: Car Updated",
      car,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Updating Car",
      error: error.message,
    });
  }
};

export const deleteCarHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateSingleCarParams.parse(req.params);
    const car = await deleteCar(parsedParams);
    return res.status(200).json({
      message: "Success: Car Deleted",
      car,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Deleting Car",
      error: error.message,
    });
  }
};