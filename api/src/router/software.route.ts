import express from "express";
import { createSoftware } from "../controler/software.controler";
import { isAdmin, verifyjwt } from "../middleware/auth.middleware";
import { softwareScreening } from "../middleware/inputScreening.middleware";

const route = express.Router();
route.post("/create", verifyjwt, isAdmin, softwareScreening, createSoftware);

export default route;
