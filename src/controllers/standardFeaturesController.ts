import { Request, Response } from "express";
import { z } from "zod";
import { validateStandardFeaturesCreate } from "../validations/standardFeatureValidations";
import {
  allStandardFeatures,
  createStandardFeatures,
} from "../services/standardFeaturesService";

export const getAllStandardFeaturesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const standardFeatures = await allStandardFeatures();
    return res.status(200).json({
      status: "1",
      message: "Success: Standard Features are fetched",
      payload: standardFeatures,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: "0",
        payload: [],
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: error.message,
      payload: [],
      status: "0",
    });
  }
};

export const createStandardFeaturesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedStandardFeature = validateStandardFeaturesCreate.parse(
      req.body
    );
    const standardFeature = await createStandardFeatures(parsedStandardFeature);
    return res.status(201).json({
      message: "Success: Standard Feature Created",
      payload: standardFeature,
      status: "1",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
        status: "0",
        payload: [],
      });
    }

    return res.status(500).json({
      message: error.message,
      payload: [],
      status: "0",
    });
  }
};
