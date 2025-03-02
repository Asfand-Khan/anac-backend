import { Request, Response } from "express";
import { z } from "zod";
import {
  allUsers,
  authenticateUsers,
  createUser,
  getSingleUser,
} from "../services/usersService";
import {
  validateSingleUserParams,
  validateUserLogin,
  validateUserRegister,
} from "../validations/userValidations";

export const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await allUsers();
    return res.status(200).json({
      status: "1",
      message: "Success: Users are fetched",
      payload: users,
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
      message: error.message,
      payload: [],
      status: "0",
    });
  }
};

export const createUsersHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedUser = validateUserRegister.parse(req.body);
    const user = await createUser(parsedUser);
    return res.status(201).json({
      status: "1",
      message: "Success: User Created",
      payload: user,
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

export const getSingleUserHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const params = req.params;
    const parsedData = validateSingleUserParams.parse(params);
    const users = await getSingleUser(parsedData);
    return res.status(200).json({
      status: "1",
      message: "Success: Single User is fetched",
      payload: users,
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
      message: error.message,
      payload: [],
      status: "0",
    });
  }
};

export const loginUsersHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedUser = validateUserLogin.parse(req.body);
    const user = await authenticateUsers(parsedUser);
    return res.status(200).json({
      status: "1",
      message: "Success: User Login Successfull",
      payload: user,
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
