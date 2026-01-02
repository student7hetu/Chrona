import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { findMatches } from "../controllers/match.controller";

const router = express.Router();

router.get("/", protect, findMatches);

export default router;
