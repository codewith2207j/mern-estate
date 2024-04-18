import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = 4000;
app.use(express.json());

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
