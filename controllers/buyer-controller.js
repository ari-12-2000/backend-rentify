import Buyer from "../models/Buyer.js";
import bcrypt from "bcryptjs";
import Interest from "../models/Interest.js";

export const getAllBuyers = async (req, res, next) => {
  let Buyers;
  try {
    Buyers = await Buyer.find();
  } catch (err) {
    return console.log(err);
  }
  if (!Buyers) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ Buyers });
};

export const signup = async (req, res, next) => {
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
  const hashedPassword = bcrypt.hashSync(password);
  let buyer;
  try {
    buyer = new Buyer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone: parseInt(phone),
    });
    buyer = await buyer.save();
  } catch (err) {
    return console.log(err);
  }
  if (!buyer) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ id: buyer._id });
};

export const updateBuyer = async (req, res, next) => {
  const id = req.params.id;
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
  const hashedPassword = bcrypt.hashSync(password);

  let buyer;
  try {
    buyer = await Buyer.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone: parseInt(phone),
    });
  } catch (errr) {
    return console.log(errr);
  }
  if (!buyer) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ message: "Updated Sucessfully" });
};

export const deleteBuyer = async (req, res, next) => {
  const id = req.params.id;
  let buyer;
  try {
    buyer = await Buyer.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!buyer) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingBuyer;
  try {
    existingBuyer = await Buyer.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingBuyer) {
    return res
      .status(404)
      .json({ message: "Unable to find Buyer from this ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingBuyer.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ message: "Login Successfull", id: existingBuyer._id });
};

export const getInterestsOfBuyer = async (req, res, next) => {
  const id = req.params.id;
  let interest;
  try {
    interest = await Interest.find({ buyer: id })
      .populate("house")
      .populate("buyer");
  } catch (err) {
    return console.log(err);
  }
  if (!interest) {
    return res.status(500).json({ message: "Unable to get Interest" });
  }
  return res.status(200).json({ interest });
};

export const getBuyerById = async (req, res, next) => {
  const id = req.params.id;
  let buyer;
  try {
    buyer = await Buyer.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!buyer) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ buyer });
};
