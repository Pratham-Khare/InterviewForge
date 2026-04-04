import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";

const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main className="auth-loading">
                <div className="spinner spinner-lg" aria-label="Loading application" />
            </main>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Protected;