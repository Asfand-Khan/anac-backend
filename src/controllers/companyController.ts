import { Request, Response } from "express";
import { allCompanies, createCompanies } from "../services/companiesService";
import { z } from "zod";
import { validateCompanyCreate } from "../validations/companyValidations";

export const getAllCompaniesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const companies = await allCompanies();
    return res.status(200).json({
      status: "1",
      message: "Success: Companies are fetched",
      payload: companies,
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

export const createCompaniesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parsedCompany = validateCompanyCreate.parse(req.body);
    const company = await createCompanies(parsedCompany);
    return res.status(201).json({
      status: "1",
      message: "Success: Company Created",
      payload: company,
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
