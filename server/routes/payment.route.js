import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/payment.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/create-checkout-session").post( isAuthenticated, createCheckoutSession);

// Webhook (set rawBody middleware!)
router.route("/webhook").post(express.raw({ type: "application/json" }), stripeWebhook);

export default router;
