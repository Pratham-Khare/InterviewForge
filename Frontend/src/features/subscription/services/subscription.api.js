import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

/* ---------------- GET PLANS ---------------- */

export async function getSubscriptionPlans() {

    try {

        const response = await api.get("/api/subscription/plans")

        return response.data

    } catch (error) {

        console.error("Failed to fetch plans", error)

    }

}


/* ---------------- GET USER TOKENS ---------------- */

export async function getUserTokens() {

    try {

        const response = await api.get("/api/subscription/tokens")

        return response.data

    } catch (error) {

        console.error("Failed to fetch user tokens", error)

    }

}


/* ---------------- CREATE ORDER ---------------- */

export async function createOrder(plan) {

    try {

        const response = await api.post("/api/subscription/create-order", {
            plan
        })

        return response.data

    } catch (error) {

        console.error("Failed to create order", error)

    }

}


/* ---------------- VERIFY PAYMENT ---------------- */

export async function verifyPayment(paymentData) {

    try {

        const response = await api.post("/api/subscription/verify-payment", paymentData)

        return response.data

    } catch (error) {

        console.error("Payment verification failed", error)

    }

}