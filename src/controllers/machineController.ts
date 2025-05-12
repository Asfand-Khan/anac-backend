import { Request, Response } from "express";
import prisma from "../config/db";
import { Machine } from "@prisma/client";
import {
  validateMachine,
  validateMachineParams,
} from "../validations/machineValidations";
import { z } from "zod";

export const getAllMachines = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const machines: Machine[] = await prisma.machine.findMany({
      include: {
        parts: true,
        unit: {
          select: {
            unit_name: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Machines fetched successfully",
      payload: machines,
    });
  } catch (err) {
    console.error("Error fetching machines:", err);

    return res.status(500).json({
      status: 0,
      message: "While fetching machines, An unexpected error occurred",
      payload: [],
    });
  }
};

export const getSingleMachine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedData = validateMachineParams.parse(req.params);

    const machine = await prisma.machine.findUnique({
      where: { id: parsedData.id },
      include: {
        parts: true,
        unit: true,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Single machine fetched successfully",
      payload: [machine],
    });
  } catch (err) {
    console.error("Error fetching machine:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While fetching single machine, An unexpected error occurred",
      payload: [],
    });
  }
};

export const createMachine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedMachine = validateMachine.parse(req.body);

    const ifExists = await prisma.machine.findFirst({
      where: {
        machine_kind: {
          contains: parsedMachine.machine_kind,
        },
        machine_make: {
          contains: parsedMachine.machine_make,
        },
        machine_type: {
          contains: parsedMachine.machine_type,
        },
      },
    });

    if (ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Machine already exists with this same kind, make and type",
        payload: [],
      });
    }

    const newMachine = await prisma.machine.create({ data: parsedMachine });

    return res.status(201).json({
      status: 1,
      message: "Success: Machine created successfully",
      payload: [newMachine],
    });
  } catch (err) {
    console.error("Error creating machine:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While creating machine, An unexpected error occurred",
      payload: [],
    });
  }
};

export const updateMachine = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedParams = validateMachineParams.parse(req.params);
    const parsedMachine = validateMachine.parse(req.body);

    const ifExists = await prisma.machine.findUnique({
      where: { id: parsedParams.id },
    });

    if (!ifExists) {
      return res.status(400).json({
        status: 0,
        message: "Machine does not exist",
        payload: [],
      });
    }

    const updatedMachine = await prisma.machine.update({
      data: parsedMachine,
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Machine updated successfully",
      payload: [updatedMachine],
    });
  } catch (err) {
    console.error("Error updating machine:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While updating machine, An unexpected error occurred",
      payload: [],
    });
  }
};

export const deleteMachine = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedParams = validateMachineParams.parse(req.params);
    const deletedMachine = await prisma.machine.delete({
      where: {
        id: parsedParams.id,
      },
    });

    return res.status(200).json({
      status: 1,
      message: "Success: Machine deleted successfully",
      payload: [deletedMachine],
    });
  } catch (err) {
    console.error("Error deleting machine:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 0,
        message: err.errors[0].message,
        payload: [],
      });
    }

    return res.status(500).json({
      status: 0,
      message: "While deleting machine, An unexpected error occurred",
      payload: [],
    });
  }
};
