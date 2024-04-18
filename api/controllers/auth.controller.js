import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ error: "invalid entry" });
  }
  const hasPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: hasPassword });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credential!"));

    const token = await jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access-token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
