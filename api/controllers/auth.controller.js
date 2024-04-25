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

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access-token");
    res.status(200).json("Sign Out Successfully");
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  const randomString = Math.random().toString(36).slice(-8);

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access-token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hasPassword = await bcryptjs.hash(generatePassword, 10);
      const generateUsername =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: generateUsername,
        email: email,
        password: hasPassword,
        avatar: photo,
      });

      await newUser.save();
      // provide token to new user from google
      const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access-token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
