import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogdata } from "./blogdata";
import { useAuth } from "./auth";

function BlogPost() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { slug } = useParams();

    const blogpost = blogdata.find(post => post.slug === slug);

    const canDelete = auth.user?.isAdmin || blogpost.author === auth.user?.username;

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
                <button>Eliminar blogpost</button>
            )}
        </>
    )
}

export { BlogPost };