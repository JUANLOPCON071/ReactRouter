import React from "react";
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

function LoginPage() {
    const auth = useAuth();
    const [username, setUsername] = React.useState('')

    const login = (e) => {
        e.preventDefault();
        auth.login({ username });
    };

    if (auth.user) {
        return <Navigate to='/profile' replace/>
    }

    return (
        <>
            <h1> Login </h1>

            <form onSubmit={login}>
                <label>Escriba su nombre de usuario:</label>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <button type='submit'>Entrar</button>
            </form>
        </>
    )
}

export { LoginPage };