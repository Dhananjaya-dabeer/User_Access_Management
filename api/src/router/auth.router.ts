import express from "express";
import { getMe, login, logout, signup } from "../controler/auth.controler";
import {
  loginScreening,
  registerScreening,
  softwareScreening,
} from "../middleware/inputScreening.middleware";
import { verifyjwt } from "../middleware/auth.middleware";

const route = express.Router();

route.post("/signup", registerScreening, signup);
route.post("/login", loginScreening, login);
route.post("/logout", logout);
route.get("/me", verifyjwt, getMe);
export default route;
