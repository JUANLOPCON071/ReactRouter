import React from "react";
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

function LogoutPage() {
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout()
    };

    if (!auth.user) {
            return <Navigate to='/' replace/>
        }

    return (
        <>
            <h1> Logout </h1>

            <form onSubmit={logout}>
                <label>¿Seguro de que quieres salir?</label>

                <button type='submit'>Salir</button>
            </form>
        </>
    )
}

export { LogoutPage };