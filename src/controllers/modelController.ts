import { Request, Response } from "express";
import { z } from "zod";
import { allModels, createModels } from "../services/modelService";
import { validateModelCreate } from "../validations/modelValidations";

export const getAllModelsHandler = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const companies = await allModels();
      return res.status(200).json({
        message: "Success: Models are fetched",
        companies,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
        });
      }
  
      return res.status(500).json({
        message: "Error: While Fetching Models",
        error: error.message,
      });
    }
  };

export const createModelHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedModel = validateModelCreate.parse(req.body);
    const company = await createModels(parsedModel);
    return res.status(201).json({
      message: "Success: Model Created",
      company,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Creating Model",
      error: error.message,
    });
  }
};
