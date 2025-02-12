import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./auth";
import Swal from "sweetalert2";

function BlogPost() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { slug } = useParams();

    const blogpost = auth.blogdata.find(post => post.slug === slug);

    if (!blogpost) {
        return (
            <div>
                <h2>Blog post no encontrado 😢</h2>
                <button onClick={() => navigate('/blog')}>Volver al blog</button>
            </div>
        );
    }

    const handleEditClick = () => {
        if (!auth.user) {
            navigate('/login', { state: { from: `/blog/${slug}`}})
        } else if (blogpost.author !== auth.user.username) {
            Swal.fire({
                icon: 'error',
                title: 'Acceso denegado',
                text: 'No tienes permiso para editar este blog',
            });
        } else {
            navigate(`/edit/${slug}`)
        }
    }

    const canDelete = auth.user?.isAdmin || blogpost.author === auth.user?.username;

    const handleDelete = () => {
        auth.deleteBlogPost(slug)
    }

    const returnToBlog = () => {
        navigate('/blog');
    }

    return (
        <>
            <h2>{blogpost.title}</h2>
            <button onClick={returnToBlog}>Volcer al blog</button>
            <p>{blogpost.author}</p>
            <p>{blogpost.content}</p>

            <button
                onClick={handleEditClick}
                style={{ marginTop: "10px", backgroundColor: "#007BFF", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
            >
                Editar blog
            </button>

            {canDelete && (
                <button onClick={handleDelete} style={{ color: 'red', marginTop: '10px'}}>
                    Eliminar blogpost
                </button>
            )}
        </>
    )
}

export { BlogPost };