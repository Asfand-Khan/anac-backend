import { Request, Response } from "express";
import prisma from "../config/db";
import { Sample } from "@prisma/client";
import {
  validateSample,
  validateSampleParams,
} from "../validations/sampleValidations";
import { z } from "zod";

export const getAllSamples = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const samples: Sample[] = await prisma.sample.findMany();

    return res.status(200).json({
      status: 1,
      message: "Success: Samples fetched successfully",
      payload: samples,
    });
  } catch (err) {
    console.error("Error fetching samples:", err);

    return res.status(500).json({
      status: 0,
      message: "While fetching samples, An unexpected error occurred",
      payload: [],
    });
  }
};

export const getSingleSample = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedData = validateSampleParams.parse(req.params);

    const sample = await prisma.sample.findUnique({
      where: { id: parsedData.id },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Single sample fetched successfully",
      payload: [sample],
    });
  } catch (err) {
    console.error("Error fetching sample:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While fetching single sample, An unexpected error occurred",
      payload: [],
    });
  }
};

export const createSample = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedSample = validateSample.parse(req.body);

    const newSample = await prisma.sample.create({ data: parsedSample });

    return res.status(201).json({
      status: 1,
      message: "Success: Sample created successfully",
      payload: [newSample],
    });
  } catch (err) {
    console.error("Error creating sample:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While creating sample, An unexpected error occurred",
      payload: [],
    });
  }
};

export const updateSample = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateSampleParams.parse(req.params);
    const parsedSample = validateSample.parse(req.body);

    const ifExists = await prisma.sample.findUnique({
      where: { id: parsedParams.id },
    });

    if (!ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Sample does not exist",
        payload: [],
      });
    }

    const updatedSample = await prisma.sample.update({
      data: parsedSample,
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Sample updated successfully",
      payload: [updatedSample],
    });
  } catch (err) {
    console.error("Error updating sample:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While updating sample, An unexpected error occurred",
      payload: [],
    });
  }
};

export const deleteSample = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateSampleParams.parse(req.params);
    const deletedSample = await prisma.sample.delete({
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Sample deleted successfully",
      payload: [deletedSample],
    });
  } catch (err) {
    console.error("Error deleting sample:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While deleting sample, An unexpected error occurred",
      payload: [],
    });
  }
};
