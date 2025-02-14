import React, { useState } from "react";
import { useAuth } from "./auth";

function EditProfilePage() {
    const { user, users, editProfile } = useAuth();
    const currentUser = users.find(u => u.name === user.username);

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        direccion: currentUser?.direccion || '',
        edad: currentUser?.edad || '',
        cargo: currentUser?.cargo || '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editProfile(formData);
        alert('Perfil actualizado con exito!')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Perfil</h2>

            <label>Nombre:</label>
            <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <label>Direccion:</label>
            <input 
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange} 
            />

            <label>Edad:</label>
            <input 
                type="numer"
                name="edad"
                value={formData.edad}
                onChange={handleChange} 
            />
            
            <label>Cargo:</label>
            <input 
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange} 
            />

            <button type="submit">Guardar cambios</button>
        </form>
    )
}

export { EditProfilePage };