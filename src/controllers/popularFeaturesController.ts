import { Request, Response } from "express";
import { z } from "zod";
import { validatePopularFeatureCreate } from "../validations/popularFeatureValidations";
import {
  allPopularFeatures,
  createPopularFeature,
} from "../services/popularFeaturesService";

export const getAllPopularFeaturesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const popularFeatures = await allPopularFeatures();
    return res.status(200).json({
      status: "1",
      message: "Success: Popular Features are fetched",
      payload: popularFeatures,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: "0",
        message: error.errors[0].message,
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

export const createPopularFeaturesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedPopularFeature = validatePopularFeatureCreate.parse(req.body);
    const popularFeature = await createPopularFeature(parsedPopularFeature);
    return res.status(201).json({
      status: "1",
      message: "Success: Popular Feature Created",
      payload: popularFeature,
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
      status: "0",
      payload: [],
    });
  }
};
