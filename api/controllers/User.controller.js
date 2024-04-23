import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";

export const home = (req, res) => {
  res.send("Api router User");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can edit your account only"));
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.photo,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
