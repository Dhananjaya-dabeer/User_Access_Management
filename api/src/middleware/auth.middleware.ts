import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
declare module "express" {
  interface Request {
    user?: {
      id: number;
      role: "Employee" | "Manager" | "Admin";
    };
  }
}
export const verifyjwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(errorHandler(404, "You are not authorized!"));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: "string";
    };
    req.user = {
      id: decoded.id,
      role: decoded.role as "Employee" | "Manager" | "Admin",
    };
    next();
  } catch (error) {
    next(errorHandler(error.statusCode || 403, "Session Expired Plese login!"));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req?.user?.role !== "Admin")
    next(errorHandler(403, "Admin access required!"));
  next();
};

export const isManagerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!["Manager", "Admin"].includes(req.user?.role || ""))
    next(errorHandler(403, "Manager or Admin access required!"));
  next();
};
