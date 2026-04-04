const userModel = require("../models/user.model")
const PLANS = require("../config/plans")

async function creditTokensToUser(userId, planName) {

    const plan = PLANS[planName]

    if (!plan) {
        throw new Error("Invalid subscription plan")
    }

    const user = await userModel.findById(userId)

    if (!user) {
        throw new Error("User not found")
    }

    user.tokens += plan.tokens
    user.subscriptionPlan = planName

    await user.save()

    return {
        tokens: user.tokens,
        plan: user.subscriptionPlan
    }
}

module.exports = { creditTokensToUser }