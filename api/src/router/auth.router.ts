import express from "express";
import { login, signup } from "../controler/auth.controler";
import {
  loginScreening,
  registerScreening,
  softwareScreening,
} from "../middleware/inputScreening.middleware";

const route = express.Router();

route.post("/signup", registerScreening, signup);
route.post("/login", loginScreening, login);
export default route;
