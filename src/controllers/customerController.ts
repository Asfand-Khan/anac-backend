// src/controllers/customer.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";
import { Customer } from "@prisma/client";
import {
  validateCustomer,
  validateCustomerParams,
} from "../validations/customerValidations";
import { z } from "zod";

export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const customers: Customer[] = await prisma.customer.findMany({
      include: {
        units: {
          select: {
            unit_name: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Customers fetched successfully",
      payload: customers,
    });
  } catch (err) {
    console.error("Error fetching customers:", err);

    return res.status(500).json({
      status: 0,
      message: "While fetching customers, An unexpected error occurred",
      payload: [],
    });
  }
};

export const getSingleCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const params = req.params;
    const parsedData = validateCustomerParams.parse(params);

    const customer = await prisma.customer.findUnique({
      where: { id: parsedData.id },
      include: {
        units: {
          select: {
            unit_name: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Single Customer fetched successfully",
      payload: [customer],
    });
  } catch (err) {
    console.error("Error fetching customer:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While fetching single customer, An unexpected error occurred",
      payload: [],
    });
  }
};

export const createCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedCustomer = validateCustomer.parse(req.body);

    const ifExists = await prisma.customer.findFirst({
      where: { contact_no: parsedCustomer.contact_no },
    });

    if (ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Customer already exists with this contact number",
        payload: [],
      });
    }

    const newCustomer = await prisma.customer.create({ data: parsedCustomer });

    return res.status(201).json({
      status: 1,
      message: "Success: Customer created successfully",
      payload: [newCustomer],
    });
  } catch (err) {
    console.error("Error creating customer:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While creating customer, An unexpected error occurred",
      payload: [],
    });
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateCustomerParams.parse(req.params);
    const parsedCustomer = validateCustomer.parse(req.body);

    const ifExists = await prisma.customer.findUnique({
      where: { id: parsedParams.id },
    });

    if (!ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Customer does not exist",
        payload: [],
      });
    }

    const updatedCustomer = await prisma.customer.update({
      data: parsedCustomer,
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Customer updated successfully",
      payload: [updatedCustomer],
    });
  } catch (err) {
    console.error("Error updating customer:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While updating customer, An unexpected error occurred",
      payload: [],
    });
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedParams = validateCustomerParams.parse(req.params);
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Customer deleted successfully",
      payload: [deletedCustomer],
    });
  } catch (err) {
    console.error("Error deleting customer:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While deleting customer, An unexpected error occurred",
      payload: [],
    });
  }
};
