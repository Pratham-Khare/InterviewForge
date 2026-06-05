import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        plan: {
            type: String,
            enum: ["STARTER", "PRO", "ULTIMATE"],
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        orderId: {
            type: String,
            required: true,
            unique: true
        },

        paymentId: {
            type: String,
            default: null
        },

        signature: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
            default: "PENDING"
        },

        failureReason: {
            type: String,
            default: null
        },

        isTokensCredited: {
            type: Boolean,
            default: false
        },

        refundStatus: {
            type: String,
            enum: ["NONE", "PENDING", "REFUNDED"],
            default: "NONE"
        }
    },
    {
        timestamps: true
    }
)

const Payment = mongoose.model("payments", paymentSchema)

export default Payment