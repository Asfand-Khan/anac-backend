import { Request, Response } from "express";
import { z } from "zod";
import {
  validateAfterMarketAccessoriesCreate,
  validateSingleAftermarketAccParams,
} from "../validations/afterMarketAccessoriesValidations";
import {
  allAfterMarketAccessories,
  createAfterMarketAccessories,
  deleteAfterMarketAccessory,
  getAftermarketAccessory,
  updateAfterMarketAccessory,
} from "../services/afterMarketAccessoriesService";

export const getAllAfterMarketAccessoriesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const afterMarketAccessories = await allAfterMarketAccessories();
    return res.status(200).json({
      status: "1",
      message: "Success: AfterMarketAccessories are fetched",
      payload: afterMarketAccessories,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
        payload: [],
        status: "0",
      });
    }

    return res.status(500).json({
      message: `${error.message}`,
      payload: [],
      status: "0",
    });
  }
};

export const createAfterMarketAccessoriesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedAfterMarketAccessory =
      validateAfterMarketAccessoriesCreate.parse(req.body);
    const afterMarketAcc = await createAfterMarketAccessories(
      parsedAfterMarketAccessory
    );
    return res.status(201).json({
      status: "1",
      message: "Success: AfterMarketAccessories Created",
      payload: afterMarketAcc,
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
      message: `Error: While Creating AfetrMarketAccessory --> ${error.message}`,
      payload: [],
      status: "0",
    });
  }
};

export const getSingleAfterMarketAccessoriesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const params = req.params;
    const parsedData = validateSingleAftermarketAccParams.parse(params);
    const afterMarketAcc = await getAftermarketAccessory(parsedData);
    return res.status(200).json({
      status: "1",
      message: "Success: AfterMarketAccessories Fetched",
      payload: afterMarketAcc,
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
      message: `Error: While Fetching Single AfetrMarketAccessory --> ${error.message}`,
      payload: [],
      status: "0",
    });
  }
};

export const updateAfterMarketAccessoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const params = req.params;
    const parsedParams = validateSingleAftermarketAccParams.parse(params);
    const parsedData = validateAfterMarketAccessoriesCreate.parse(req.body);
    const afterMarketAcc = await updateAfterMarketAccessory(parsedData, parsedParams);
    return res.status(200).json({
      status: "1",
      message: "Success: AfterMarketAccessories Updated",
      payload: afterMarketAcc,
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
      message: `Error: While Fetching Single AfetrMarketAccessory --> ${error.message}`,
      payload: [],
      status: "0",
    });
  }
};

export const deleteAfterMarketAccessoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateSingleAftermarketAccParams.parse(req.params);
    const car = await deleteAfterMarketAccessory(parsedParams);
    return res.status(200).json({
      message: "Success: Aftermarket Accessory Deleted",
      car,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Deleting Aftermarket Accessory",
      error: error.message,
    });
  }
};
