import { Request, Response } from "express";
import prisma from "../config/db";
import { Part } from "@prisma/client";
import {
  validatePart,
  validatePartParams,
} from "../validations/partValidation";
import { z } from "zod";

export const getAllParts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parts: Part[] = await prisma.part.findMany();

    return res.status(200).json({
      status: 1,
      message: "Success: Parts fetched successfully",
      payload: parts,
    });
  } catch (err) {
    console.error("Error fetching parts:", err);

    return res.status(500).json({
      status: 0,
      message: "While fetching parts, An unexpected error occurred",
      payload: [],
    });
  }
};

export const getSinglePart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedData = validatePartParams.parse(req.params);

    const part = await prisma.part.findUnique({
      where: { id: parsedData.id },
      include: {
        machine: true,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Single part fetched successfully",
      payload: [part],
    });
  } catch (err) {
    console.error("Error fetching part:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While fetching single part, An unexpected error occurred",
      payload: [],
    });
  }
};

export const createPart = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedPart = validatePart.parse(req.body);

    const ifExists = await prisma.part.findFirst({
      where: {
        part_kind: {
          contains: parsedPart.part_kind,
        },
        part_make: {
          contains: parsedPart.part_make,
        },
        part_type: {
          contains: parsedPart.part_type,
        },
      },
    });

    if (ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Part already exists with this make, type and kind",
        payload: [],
      });
    }

    const newPart = await prisma.part.create({ data: parsedPart });

    return res.status(201).json({
      status: 1,
      message: "Success: Part created successfully",
      payload: [newPart],
    });
  } catch (err) {
    console.error("Error creating part:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While creating part, An unexpected error occurred",
      payload: [],
    });
  }
};

export const updatePart = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedParams = validatePartParams.parse(req.params);
    const parsedPart = validatePart.parse(req.body);

    const ifExists = await prisma.part.findUnique({
      where: { id: parsedParams.id },
    });

    if (!ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Part does not exist",
        payload: [],
      });
    }

    const updatedPart = await prisma.part.update({
      data: parsedPart,
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Part updated successfully",
      payload: [updatedPart],
    });
  } catch (err) {
    console.error("Error updating part:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While updating part, An unexpected error occurred",
      payload: [],
    });
  }
};

export const deletePart = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedParams = validatePartParams.parse(req.params);
    const deletedPart = await prisma.part.delete({
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Part deleted successfully",
      payload: [deletedPart],
    });
  } catch (err) {
    console.error("Error deleting part:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While deleting part, An unexpected error occurred",
      payload: [],
    });
  }
};
