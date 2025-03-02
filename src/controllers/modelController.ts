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
      status: "1",
      message: "Success: Models are fetched",
      payload: companies,
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
      status: "0",
      message: error.message,
      payload: [],
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
      status: "1",
      message: "Success: Model Created",
      payload: company,
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
      status: "0",
      payload: [],
    });
  }
};
