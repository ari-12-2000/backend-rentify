import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
  house: {
    type: mongoose.Types.ObjectId,
    ref: "House",
    required: true,
  },

  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
});

export default mongoose.model("Interest", interestSchema);
