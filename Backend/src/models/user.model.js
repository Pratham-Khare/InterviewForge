const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "username already taken"],
            required: true
        },

        email: {
            type: String,
            unique: [true, "Account already exists with this email address"],
            required: true
        },

        password: {
            type: String,
            required: true
        },

        profilePictureUrl: {
            type: String
        },

        theme: {
            type: String,
            enum: ["dark", "light"],
            default: "dark"
        },

        emailAlertsEnabled: {
            type: Boolean,
            default: true
        },

        connectedProviders: {
            google: {
                type: Boolean,
                default: false
            },
            github: {
                type: Boolean,
                default: false
            }
        },

        /* ---------------- SUBSCRIPTION SYSTEM ---------------- */

        tokens: {
            type: Number,
            default: 1, // first time user gets 1 free token
            min: 0
        },

        subscriptionPlan: {
            type: String,
            enum: ["FREE", "STARTER", "PRO", "ULTIMATE"],
            default: "FREE"
        }

    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;