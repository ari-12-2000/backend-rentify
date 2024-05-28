import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import sellerRouter from "./routes/seller-routes.js";
import buyerRouter from "./routes/buyer-routes.js";
import houseRouter from "./routes/house-routes.js";
import interestRouter from "./routes/interest-routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use("/seller", sellerRouter);
app.use("/buyer", buyerRouter);
app.use("/house", houseRouter);
app.use("/interest", interestRouter);

mongoose.set('strictQuery', false);
mongoose
  .connect(
    `mongodb+srv://arikum12000:${process.env.MONGODB_PASSWORD}@cluster0.xcek0zz.mongodb.net/`
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));
