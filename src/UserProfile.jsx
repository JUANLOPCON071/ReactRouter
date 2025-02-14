import React from "react"; 
import { useAuth } from "./auth";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { name } = useParams();

    const user = auth.users.find(user => user.name === name)

    if (!user) {
        return (
            <div>
                <h2>Usuario no encontrado 😢</h2>
                <button onClick={() => navigate('/')}>Volver a home</button>
            </div>
        );
    }

    return (
        <>
            <h1>{user.name}</h1>
            <p>Direccion: {user.direccion}</p>
            <p>Edad: {user.edad}</p>
            <p>Cargo: {user.cargo}</p>
        </>
    )
}

export { UserProfile };