import express from "express";
import {
  deleteInterest,
  getInterestById,
  newInterest,
} from "../controllers/interest-controller.js";

const interestRouter = express.Router();

interestRouter.get("/:id", getInterestById);
interestRouter.post("/", newInterest);
interestRouter.delete("/:id", deleteInterest);

export default interestRouter;

