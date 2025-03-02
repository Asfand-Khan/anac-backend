import { Request, Response } from "express";
import { z } from "zod";
import { validateInstalledOptionCreate } from "../validations/installedOptionValidations";
import {
  allInstalledOptions,
  createInstalledOptions,
} from "../services/installedOptionsService";

export const getAllInstalledOptionsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const installedOptions = await allInstalledOptions();
    return res.status(200).json({
      status: "1",
      message: "Success: Installed Options are fetched",
      payload: installedOptions,
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

export const createInstalledOptionsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedInsatalledOption = validateInstalledOptionCreate.parse(
      req.body
    );
    const insatalledOption = await createInstalledOptions(
      parsedInsatalledOption
    );
    return res.status(201).json({
      status: "1",
      message: "Success: Installed Option Created",
      payload: insatalledOption,
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
      status: "0",
      message: error.message,
      payload: [],
    });
  }
};
