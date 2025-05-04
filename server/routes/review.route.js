import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createOrUpdateReview } from "../controllers/review.controller.js";

const router = express.Router();

router.route("/:productId").post(isAuthenticated,createOrUpdateReview)
export default router;
