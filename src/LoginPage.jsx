import React from "react";
import { useAuth } from "./auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = React.useState('')

    const from = location.state?.from || '/profile';

    const login = (e) => {
        e.preventDefault();
        auth.login({ username });
        navigate(from, {replace: true})
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