import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 4000;
app.use(express.json());
app.use(cookieParser());

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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
