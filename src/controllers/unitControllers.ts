import { Request, Response } from "express";
import prisma from "../config/db";
import { Unit } from "@prisma/client";
import {
  validateUnit,
  validateUnitParams,
} from "../validations/unitValidations";
import { z } from "zod";

// export const getAllUnits = async (req: Request, res: Response) => {
//   try {
//     const units = await prisma.unit.findMany({ include: { machines: true } });
//     res.json(units);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

export const getAllUnits = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const units: Unit[] = await prisma.unit.findMany({
      include: {
        machines: true,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Units fetched successfully",
      payload: units,
    });
  } catch (err) {
    console.error("Error fetching units:", err);

    return res.status(500).json({
      status: 0,
      message: "While fetching units, An unexpected error occurred",
      payload: [],
    });
  }
};

export const getSingleUnit = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedData = validateUnitParams.parse(req.params);

    const unit = await prisma.unit.findUnique({
      where: { id: parsedData.id },
      include: {
        machines: true,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Single unit fetched successfully",
      payload: [unit],
    });
  } catch (err) {
    console.error("Error fetching unit:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While fetching single unit, An unexpected error occurred",
      payload: [],
    });
  }
};

export const createUnit = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedUnit = validateUnit.parse(req.body);

    const ifExists = await prisma.unit.findFirst({
      where: {
        unit_name: {
          contains: parsedUnit.unit_name,
        },
      },
    });

    if (ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Unit already exists with this name",
        payload: [],
      });
    }

    const newUnit = await prisma.unit.create({ data: parsedUnit });

    return res.status(201).json({
      status: 1,
      message: "Success: Unit created successfully",
      payload: [newUnit],
    });
  } catch (err) {
    console.error("Error creating unit:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While creating unit, An unexpected error occurred",
      payload: [],
    });
  }
};

export const updateUnit = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateUnitParams.parse(req.params);
    const parsedUnit = validateUnit.parse(req.body);

    const ifExists = await prisma.unit.findUnique({
      where: {
        id: parsedParams.id,
      },
    });

    if (!ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Unit does not exist",
        payload: [],
      });
    }

    const updatedUnit = await prisma.unit.update({
      data: parsedUnit,
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Unit updated successfully",
      payload: [updatedUnit],
    });
  } catch (err) {
    console.error("Error updating unit:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While updating unit, An unexpected error occurred",
      payload: [],
    });
  }
};

export const deleteUnit = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateUnitParams.parse(req.params);
    const deletedUnit = await prisma.unit.delete({
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Unit deleted successfully",
      payload: [deletedUnit],
    });
  } catch (err) {
    console.error("Error deleting unit:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While deleting unit, An unexpected error occurred",
      payload: [],
    });
  }
};
