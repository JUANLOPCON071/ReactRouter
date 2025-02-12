import React, { useState } from "react";
import { useAuth } from "./auth";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { slug } = useParams();

    const blogPost = auth.blogdata.find(post => 
        post.slug === slug);

    const [title, setTitle] = useState(blogPost?.title || '');
    const [content, setContent] = useState(blogPost?.content || '');

    if (!blogPost) {
        return <h2>Post no encrontrado</h2>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.editBlogPost(slug, title, content);
        navigate(`/blog/${slug}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar BlogPost</h2>
            <label>
                Titulo:
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Contenido:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Guardar Cambios</button>
            <button 
                type="button"
                onClick={() => navigate(`/blog/${slug}`)}
            >Cancelar</button>
        </form>
    )
}

export { EditBlog };