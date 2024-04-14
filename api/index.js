import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;
mongoose
  .connect(process.env.MONDODB_URL)
  .then(() => {
    console.log(`DB connected`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error: ", err);
  });
