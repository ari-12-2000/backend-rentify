import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addSeller = async (req, res, next) => {
  const { firstname, lastname, email, password, phone } = req.body;
  if (
    !firstname ||
    !firstname.trim() ||
    !lastname ||
    !lastname.trim() ||
    !email ||
    !email.trim() ||
    !password ||
    !password.trim() ||
    !phone ||
    phone.length < 10
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingSeller) {
    return res.status(400).json({ message: "Seller already exists" });
  }

  let seller;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    seller = new Seller({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone: parseInt(phone),
    });
    seller = await seller.save();
  } catch (err) {
    return console.log(err);
  }
  if (!seller) {
    return res.status(500).json({ message: "Unable to store Seller" });
  }
  return res.status(200).json({ id: seller._id });
};

export const sellerLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !email.trim() || !password || !password.trim()) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingSeller) {
    return res.status(400).json({ message: "Seller not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingSeller.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({
    message: "Authentication Complete",
    id: existingSeller._id,
  });
};

export const getSellers = async (req, res, next) => {
  let Sellers;
  try {
    Sellers = await Seller.find();
  } catch (err) {
    return console.log(err);
  }
  if (!Sellers) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ Sellers });
};

export const getSellerById = async (req, res, next) => {
  const id = req.params.id;

  let seller;
  try {
    seller = await Seller.find({_id:id}).populate("addedHouses");
    
  } catch (err) {
    return console.log(err);
  }
  if (!seller) {
    return console.log("Cannot find Seller");
  }
  return res.status(200).json({ seller });
};
