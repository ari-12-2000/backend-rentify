import mongoose from "mongoose";
const Schema = mongoose.Schema;
const buyerSchema = new Schema({
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
  interests: [{ type: mongoose.Types.ObjectId, ref: "Interest" }],
});

export default mongoose.model("Buyer", buyerSchema);
