import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ error: "invalid entry" });
  }
  const hasPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: hasPassword });

  try {
    await newUser.save();
    res.status(201).json("User added successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }

  res.json({
    response: {
      username,
      email,
    },
  });
};
