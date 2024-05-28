import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
    match: [/^\d+\s*sq\.ft$/, 'Please enter a valid area in the format "1200 sq.ft"']
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  houseUrl: {
    type: String,
    required: true,
  },
  hospitalNearby:{
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
  interests: [{ type: mongoose.Types.ObjectId, ref: "Interest" }],
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
});

export default mongoose.model("House", houseSchema);
