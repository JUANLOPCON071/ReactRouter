import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./auth";

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

            {canDelete && (
                <button onClick={handleDelete} style={{ color: 'red', marginTop: '10px'}}>
                    Eliminar blogpost
                </button>
            )}
        </>
    )
}

export { BlogPost };