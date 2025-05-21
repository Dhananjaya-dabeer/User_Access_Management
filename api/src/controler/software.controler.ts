import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Software } from "../entities/Software";

export const createSoftware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, accessLevels } = req.body;
  const softwareRepo = AppDataSource.getRepository(Software);

  const software = softwareRepo.create({
    name,
    description,
    accessLevels,
  });
  await softwareRepo.save(software);
  res.status(201).json({
    message: "Software created successfully!",
  });
};
