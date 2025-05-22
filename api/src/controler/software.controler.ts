import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Software } from "../entities/Software";
import { Request as AccessRequest } from "../entities/Request";

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

export const getAvailableSoftware = async (req: Request, res: Response) => {
  const softwareRepo = AppDataSource.getRepository(Software);
  const requestRepo = AppDataSource.getRepository(AccessRequest);

  const allSoftware = await softwareRepo.find();
  const userRequests = await requestRepo.find({
    where: { user: { id: req.user!.id } },
    relations: ["software"],
  });

  const result = allSoftware.map((software) => {
    const userRequest = userRequests.find(
      (request) => request.software.id === software.id
    );
    return {
      id: software.id,
      name: software.name,
      description:
        userRequest?.status === "Approved"
          ? software.description
          : "Restricted",
      accessGranted: userRequest?.status === "Approved",
      isPending: userRequest?.status === "Pending",
      isRejected: userRequest?.status === "Rejected",
      requestStatus: userRequest?.status ?? null,
    };
  });
};
