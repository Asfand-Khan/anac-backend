import { Request, Response } from "express";
import { z } from "zod";
import { validateAfterMarketAccessoriesCreate } from "../validations/afterMarketAccessoriesValidations";
import { allAfterMarketAccessories, createAfterMarketAccessories } from "../services/afterMarketAccessoriesService";


export const getAllAfterMarketAccessoriesHandler = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const afterMarketAccessories = await allAfterMarketAccessories();
      return res.status(200).json({
        message: "Success: AfterMarketAccessories are fetched",
        afterMarketAccessories,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
        });
      }
  
      return res.status(500).json({
        message: "Error: While Fetching AfetrMarketAccessories",
        error: error.message,
      });
    }
  };

export const createAfterMarketAccessoriesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedAfterMarketAccessory = validateAfterMarketAccessoriesCreate.parse(req.body);
    const afterMarketAcc = await createAfterMarketAccessories(parsedAfterMarketAccessory);
    return res.status(201).json({
      message: "Success: AfterMarketAccessories Created",
      afterMarketAccessory: afterMarketAcc,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Creating AfetrMarketAccessory",
      error: error.message,
    });
  }
};
