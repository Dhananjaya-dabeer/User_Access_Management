import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";

const isBodyUndefined = (req: Request) => {
  return !req.body || Object.keys(req.body).length === 0;
};
export const registerScreening = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBodyUndefined(req)) {
    next(errorHandler(400, "All fields are required!"));
  }
  const { username, password, role } = req.body;

  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (!role) missingFields.push("role");

  if (missingFields.length > 0) {
    return next(errorHandler(400, "Missing Required fields", missingFields));
  }

  next();
};

export const loginScreening = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBodyUndefined(req)) {
    next(errorHandler(400, "All fields are required!"));
    return;
  }

  const { username, password } = req.body;
  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    next(errorHandler(400, "Missing Required fields", missingFields));
    return;
  }

  next();
};

export const softwareScreening = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBodyUndefined(req)) {
    next(errorHandler(400, "All fields are required!"));
    return;
  }

  const { name, description, accessLevels } = req.body;
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!description) missingFields.push("description");
  if (!accessLevels) missingFields.push("accessLevels");

  if (missingFields.length > 0) {
    next(errorHandler(400, "Missing Required fields", missingFields));
    return;
  }
  next();
};

export const createRequestScreening = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBodyUndefined(req))
    return next(errorHandler(400, "All fields are required"));
  const { softwareId, accessType, reason } = req.body;
  const missingFields = [];
  if (!softwareId) missingFields.push("software id");
  if (!accessType) missingFields.push("accessType");
  if (reason) missingFields.push("reason");

  if (missingFields.length > 0)
    return next(errorHandler(400, "Missing Required fields", missingFields));
  next();
};
export const updateRequestsScreening = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBodyUndefined(req))
    return next(errorHandler(400, "All fields are required"));
  if (req.params === undefined)
    return next(errorHandler(400, "id is required"));
  const { id } = req.params;
  const { status } = req.body;
  const missingFields = [];
  if (!id) missingFields.push("id");
  if (!status) missingFields.push("status");

  if (missingFields.length > 0)
    return next(errorHandler(400, "Missing Required fields", missingFields));
  next();
};
