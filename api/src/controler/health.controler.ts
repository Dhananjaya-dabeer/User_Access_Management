import { Request, Response } from "express";

export const helath = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running!",
  });
};
