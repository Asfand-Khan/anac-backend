import { Request, Response } from "express";
import { z } from "zod";
import { validateInstalledOptionCreate } from "../validations/installedOptionValidations";
import { allInstalledOptions, createInstalledOptions } from "../services/installedOptionsService";

export const getAllInstalledOptionsHandler = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const installedOptions = await allInstalledOptions();
      return res.status(200).json({
        message: "Success: Installed Options are fetched",
        installedOptions,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
        });
      }
  
      return res.status(500).json({
        message: "Error: While Fetching Installed Options",
        error: error.message,
      });
    }
  };

export const createInstalledOptionsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedInsatalledOption = validateInstalledOptionCreate.parse(req.body);
    const insatalledOption = await createInstalledOptions(parsedInsatalledOption);
    return res.status(201).json({
      message: "Success: Installed Option Created",
      insatalledOption,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Creating Installed Option",
      error: error.message,
    });
  }
};
