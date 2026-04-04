const PLANS = require("../config/plans")
const { creditTokensToUser } = require("../services/subscription.service")
const userModel = require("../models/user.model")
const razorpay = require("../utils/razorpay")
const crypto = require("crypto")

async function getPlansController(req, res) {

    res.status(200).json({
        plans: PLANS
    })

}

async function getUserTokensController(req, res) {

    const user = await userModel.findById(req.user.id).select("tokens subscriptionPlan")

    res.status(200).json({
        tokens: user.tokens,
        subscriptionPlan: user.subscriptionPlan
    })

}

/* TEMP purchase endpoint (before Razorpay integration) */
async function purchasePlanController(req, res) {

    try {

        const { plan } = req.body

        const result = await creditTokensToUser(req.user.id, plan)

        res.status(200).json({
            message: "Tokens credited successfully",
            tokens: result.tokens,
            subscriptionPlan: result.plan
        })

    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }

}

async function createOrderController(req, res) {

    try {

        const { plan } = req.body

        const selectedPlan = PLANS[plan]

        if (!selectedPlan) {
            return res.status(400).json({
                message: "Invalid plan selected"
            })
        }

        const options = {
            amount: selectedPlan.price * 100, // Razorpay uses paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options)

        res.status(200).json({
            order,
            plan
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Failed to create order"
        })

    }

}

async function verifyPaymentController(req, res) {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan
        } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {

            return res.status(400).json({
                message: "Payment verification failed"
            })

        }

        const result = await creditTokensToUser(req.user.id, plan)

        res.status(200).json({
            message: "Payment successful",
            tokens: result.tokens,
            subscriptionPlan: result.plan
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Payment verification failed"
        })

    }

}



module.exports = {
    getPlansController,
    purchasePlanController,
    getUserTokensController,
    createOrderController,
    verifyPaymentController
}