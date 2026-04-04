import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { getUserTokens } from "../services/auth.api"



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })

            if (!data || !data.user) {
                return {
                    success: false,
                    message: data?.message || "Invalid email or password. Please try again."
                }
            }

            setUser(data.user)

            return { success: true }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })

            if (!data || !data.user) {
                return {
                    success: false,
                    message: data?.message || "Unable to create your account. Please try again."
                }
            }

            setUser(data.user)

            return { success: true }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

    const getAndSetUser = async () => {

        try {

            const data = await getMe()

            if (data?.user) {

                const tokenData = await getUserTokens()

                setUser({
                    ...data.user,
                    tokens: tokenData?.tokens || 0
                })

            }

        } finally {

            setLoading(false)

        }

    }
    getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}