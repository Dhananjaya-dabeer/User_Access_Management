import { Request as ExpressRequest, NextFunction, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User";
import { Software } from "../entities/Software";
import { Request as AccessRequest } from "../entities/Request";
import { errorHandler } from "../utils/errorHandler";

export const createRequest = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const { softwareId, accessType, reason } = req.body;
  const userId = req?.user?.id;

  const userRepo = AppDataSource.getRepository(User);
  const softwareRepo = AppDataSource.getRepository(Software);
  const requestRepo = AppDataSource.getRepository(AccessRequest);

  const user = await userRepo.findOne({ where: { id: userId } });
  const software = await softwareRepo.findOne({ where: { id: softwareId } });

  if (!user) {
    next(errorHandler(404, "User not found Please login"));
    return;
  }
  if (!software) {
    next(errorHandler(404, "Software not found"));
    return;
  }

  const access_request = requestRepo.create({
    user,
    software,
    accessType,
    reason,
    status: "Pending",
  });

  await requestRepo.save(access_request);
  res.status(201).json({
    message: "Access request submitted",
  });
};

export const pendingRequest = async (req: ExpressRequest, res: Response) => {
  const requestRepo = AppDataSource.getRepository(AccessRequest);

  const pendingRequests = await requestRepo.find({
    where: { status: "Pending" },
    relations: ["user", "software"],
  });
  const formatted = pendingRequests.map((request) => ({
    id: request.id,
    user: { id: request.user.id, username: request.user.username },
    software: { id: request.software.id, name: request.software.name },
    accessType: request.accessType,
    reason: request.reason,
    status: request.status,
  }));
  res.status(200).json({
    sucssess: true,
    data: formatted,
  });
};

export const getMyRequests = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const requestRepo = AppDataSource.getRepository(AccessRequest);

  const requests = await requestRepo.find({
    where: {
      user: { id: req.user?.id },
    },
    relations: ["software"],
    order: { id: "DESC" },
  });

  const formatted = requests.map((request) => ({
    id: request.id,
    software: { id: request.software.id, name: request.software.name },
    accessType: request.accessType,
    reason: request.reason,
    status: request.status,
  }));

  res.status(200).json({
    success: true,
    data: formatted,
  });
};

export const updateRequest = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;
  const requestRepo = AppDataSource.getRepository(AccessRequest);

  const accessRequest = await requestRepo.findOne({
    where: { id: parseInt(id) },
    relations: ["user", "software"],
  });

  if (!accessRequest) return next(errorHandler(404, "Request not found"));

  if (!["Approved", "Rejected"].includes(status))
    return next(errorHandler(400, "Invalid status"));

  accessRequest.status = status as "Approved" | "Rejected";
  await requestRepo.save(accessRequest);
  res.status(200).json({
    success: true,
    message: `Request ${status}`,
  });
};
