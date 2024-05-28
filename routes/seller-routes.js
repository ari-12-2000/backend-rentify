import express from "express";
import {
  addSeller,
  sellerLogin,
  getSellers,
  getSellerById,
} from "../controllers/seller-controller.js";

const sellerRouter = express.Router();

sellerRouter.post("/signup", addSeller);
sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/", getSellers);
sellerRouter.get("/:id", getSellerById);

export default sellerRouter;

