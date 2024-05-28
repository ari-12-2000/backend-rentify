import express from "express";
import {
  deleteBuyer,
  getAllBuyers,
  getInterestsOfBuyer,
  getBuyerById,
  login,
  signup,
  updateBuyer,
} from "../controllers/buyer-controller.js";

const buyerRouter = express.Router();

buyerRouter.get("/", getAllBuyers);
buyerRouter.get("/:id", getBuyerById);
buyerRouter.post("/signup", signup);
buyerRouter.put("/:id", updateBuyer);
buyerRouter.delete("/:id", deleteBuyer);
buyerRouter.post("/login", login);
buyerRouter.get("/interests/:id", getInterestsOfBuyer);

export default buyerRouter;

