import express from "express";
import { jwtCheck, parseJwt } from "../middleware/auth";
import OrderController from "../controller/OrderController";
const router = express.Router();
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  parseJwt,
  OrderController.createCheckoutSession
);
router.get("/", jwtCheck, parseJwt, OrderController.getMyOrders);
router.post("/checkout/webhook", OrderController.stripeWebhookHandler);
export default router;
