import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/User.route.js";

dotenv.config();

const app = express();
const PORT = 4000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Connected to DB`);
    app.listen(PORT, () => {
      console.log(`Connect to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });

app.use("/api/user", userRoutes);
