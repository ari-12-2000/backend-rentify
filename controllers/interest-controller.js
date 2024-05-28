import mongoose from "mongoose";
import Interest from "../models/Interest.js";
import House from "../models/House.js";
import Buyer from "../models/Buyer.js";

export const newInterest = async (req, res, next) => {
  const { house, buyer } = req.body;

  let existingHouse;
  let existingBuyer;
  try {
    existingHouse = await House.findById(house);
    existingBuyer = await Buyer.findById(buyer);
  } catch (err) {
    return console.log(err);
  }
  if (!existingHouse) {
    return res.status(404).json({ message: "House Not Found With Given ID" });
  }
  if (!buyer) {
    return res.status(404).json({ message: "Buyer not found with given ID " });
  }
  let interest;

  try {
    interest = new Interest({
      house,
      buyer,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingBuyer.interests.push(interest);
    existingHouse.interests.push(interest);
    await existingBuyer.save({ session });
    await existingHouse.save({ session });
    await interest.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!interest) {
    return res.status(500).json({ message: "Unable to create an interest" });
  }

  return res.status(201).json({ interest });
};

export const getInterestById = async (req, res, next) => {
  const id = req.params.id;
  let interest;
  try {
    interest = await Interest.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!interest) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ interest });
};

export const deleteInterest = async (req, res, next) => {
  const id = req.params.id;
  let interest;
  try {
    interest = await Interest.findByIdAndRemove(id).populate("buyer house");
    console.log(interest);
    const session = await mongoose.startSession();
    session.startTransaction();
    await interest.buyer.interest.pull(interest);
    await interest.house.interest.pull(interest);
    await interest.house.save({ session });
    await interest.buyer.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!interest) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
