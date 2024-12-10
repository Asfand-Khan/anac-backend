import { Request, Response } from "express";
import { z } from "zod";
import { validatePopularFeatureCreate } from "../validations/popularFeatureValidations";
import { allPopularFeatures, createPopularFeature } from "../services/popularFeaturesService";

export const getAllPopularFeaturesHandler = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const popularFeatures = await allPopularFeatures();
      return res.status(200).json({
        message: "Success: Popular Features are fetched",
        popularFeatures,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
        });
      }
  
      return res.status(500).json({
        message: "Error: While Fetching Popular Features",
        error: error.message,
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
      message: "Success: Popular Feature Created",
      popularFeature,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Creating Popular Feature",
      error: error.message,
    });
  }
};
