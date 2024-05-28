import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  phone:{
    type:Number,
    unique: true,
    required: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedHouses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "House",
    },
  ],
});

export default mongoose.model("Seller", sellerSchema);
