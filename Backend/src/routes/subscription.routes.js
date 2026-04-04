const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")


const {
    getPlansController,
    purchasePlanController,
    getUserTokensController,
    createOrderController,
    verifyPaymentController
} = require("../controllers/subscription.controller")

const router = express.Router()

router.get("/plans", getPlansController)

router.get(
    "/tokens",
    authMiddleware.authUser,
    getUserTokensController
)

router.post(
    "/purchase",
    authMiddleware.authUser,
    purchasePlanController
)

router.post(
    "/create-order",
    authMiddleware.authUser,
    createOrderController
)

router.post(
    "/verify-payment",
    authMiddleware.authUser,
    verifyPaymentController
)

module.exports = router