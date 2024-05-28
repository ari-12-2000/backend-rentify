import express from "express";
import {
  addHouse,
  getAllHouses,
  getHouseById,
} from "../controllers/house-controller.js";

const houseRouter = express.Router();

houseRouter.get("/", getAllHouses);
houseRouter.get("/:id", getHouseById);
houseRouter.post("/", addHouse);

export default houseRouter;

