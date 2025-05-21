import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./db/data-source";
import healthRouter from "./router/health.router";
import authRouter from "./router/auth.router";
import { Request, Response, NextFunction } from "express";
import { customError } from "./utils/errorHandler";
import softwareRouter from "../src/router/software.route";

const app = express();
app.use(express.json());
(async () => {
  try {
    await AppDataSource.initialize();
    app.listen(process.env.PORT, () => {
      console.log(
        `Database connected, server listening to ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();

app.use(cookieParser());

app.use(
  cors({
    origin: [`${process.env.LOCAL_DOMAIN}`, `${process.env.PROD_DOMAIN}`],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/software", softwareRouter);

app.use(
  (error: customError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server error";
    const errorData = error.errorData;
    res.status(statusCode).json({
      success: false,
      message,
      data: errorData,
    });
  }
);
