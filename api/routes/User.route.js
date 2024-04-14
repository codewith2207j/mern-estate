import express from "express";
import { home } from "../controllers/User.controller.js";

const router = express.Router();

router.get("/", home);

export default router;
