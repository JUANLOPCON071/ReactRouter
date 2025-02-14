import React, { useState } from "react";
import { AuthRoute, useAuth } from "./auth";
import { EditProfilePage } from "./EditProfilePage";

function ProfilePage() {
    const auth = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const isUser = auth.users.find(user => user.name === auth.user.username)

    return (
        <AuthRoute>
            <h1>Perfil</h1>
            
            <p>Welcome, {isUser.name}</p>
            <p>Direccion: {isUser.direccion}</p>
            <p>Edad: {isUser.edad}</p>
            <p>Cargo: {isUser.cargo}</p>
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>

            {isEditing && <EditProfilePage/>}
        </AuthRoute>
    )
}

export { ProfilePage };