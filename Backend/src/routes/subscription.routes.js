import express from "express";

import { authUser } from "../middlewares/auth.middleware.js";

import {
    getPlansController,
    purchasePlanController,
    getUserTokensController,
    createOrderController,
    verifyPaymentController,
    paymentFailedController
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.get("/plans", getPlansController);

router.get(
    "/tokens",
    authUser,
    getUserTokensController
);

router.post(
    "/purchase",
    authUser,
    purchasePlanController
);

router.post(
    "/create-order",
    authUser,
    createOrderController
);

router.post(
    "/verify-payment",
    authUser,
    verifyPaymentController
);

router.post(
    "/payment-failed",
    authUser,
    paymentFailedController
)

export default router;