import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Seller from "../models/Seller.js";
import House from "../models/House.js";

export const addHouse = async (req, res, next) => {
  


  // Create new house
  const { area, bedroom, bathroom, houseUrl, hospitalNearby,  location , seller} = req.body;
  if (
    !area ||
    area.trim() === "" ||
    !bedroom ||
    !bathroom ||
    !houseUrl ||!hospitalNearby || !location||
    houseUrl.trim() === ""||location.trim() === ""||hospitalNearby.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }


  console.log(seller);
  let house;
  try {
    house = new House({
      area,
      bedroom: Number(bedroom),
      bathroom: Number(bathroom),
      houseUrl,
      hospitalNearby,
      location,
      seller: seller,// here seller is a string ,it should be object id. so I am getting error. please solve it.
    });
    const session = await mongoose.startSession();
    const sellerhouse = await Seller.findById(seller);
    session.startTransaction();
    await house.save({ session });
    sellerhouse.addedHouses.push(house);
    await sellerhouse.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!house) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ house });
};

export const getAllHouses = async (req, res, next) => {
  let houses;

  try {
    houses = await House.find();
  } catch (err) {
    return console.log(err);
  }

  if (!houses) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ houses });
};

export const getHouseById = async (req, res, next) => {
  const id = req.params.id;
  let house;
  try {
    house = await House.find({_id:id}).populate('seller')
  } catch (err) {
    return console.log(err);
  }

  if (!house) {
    return res.status(404).json({ message: "Invalid House ID" });
  }

  return res.status(200).json({ house });
};
