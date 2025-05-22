import express from "express";
import {
  createRequest,
  getMyRequests,
  pendingRequest,
  updateRequest,
} from "../controler/request.controle";
import { isManagerOrAdmin, verifyjwt } from "../middleware/auth.middleware";

const route = express.Router();

route.post("/", verifyjwt, createRequest);
route.get("/pending", verifyjwt, isManagerOrAdmin, pendingRequest);
route.get("/mine", verifyjwt, getMyRequests);
route.patch("/:id", verifyjwt, isManagerOrAdmin, updateRequest);

export default route;
