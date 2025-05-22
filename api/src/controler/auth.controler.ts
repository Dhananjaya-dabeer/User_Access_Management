import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import { AppDataSource } from "../db/data-source";
import jwt from "jsonwebtoken";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, role } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  const existingUser = await userRepo.findOne({ where: { username } });
  if (existingUser) next(errorHandler(400, "User already exists!"));
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User();
  user.username = username;
  user.password = hashedPassword;
  user.role = role;

  await userRepo.save(user);
  res.status(201).json({
    success: true,
    message: "User resgistered successfully",
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { username } });
  if (!user) return next(errorHandler(400, "Invalid Credentials!"));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next(errorHandler(404, "Either Username or Password is worong!"));
  const { password: hashedPassword, ...rest } = user;
  const token = jwt.sign({ ...rest }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    path: "/",
    domain:
      process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined,
  });
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      ...rest,
    },
  });
};
export const logout = (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(Date.now() + 15 * 60 * 1000),
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DOMAIN
        : undefined,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
export const getMe = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return next(errorHandler(401, "Not authenticated!"));
  }
  res.status(200).json(user);
};
