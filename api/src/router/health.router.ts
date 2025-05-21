import express from "express";
import { helath } from "../controler/health.controler";

const route = express.Router();

route.get("/", helath);

export default route;
