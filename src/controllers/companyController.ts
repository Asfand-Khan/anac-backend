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
        message: "Success: Companies are fetched",
        companies,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
        });
      }
  
      return res.status(500).json({
        message: "Error: While Fetching Companies",
        error: error.message,
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
      message: "Success: Company Created",
      company,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({
      message: "Error: While Creating Company",
      error: error.message,
    });
  }
};
