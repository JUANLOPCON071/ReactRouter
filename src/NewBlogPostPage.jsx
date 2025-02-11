import React from "react";
import { useAuth } from "./auth";

function NewBlogPostPage() {
    const auth = useAuth();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            auth.addBlogPost(title, content)
        }
    }
    
    return (
        <>
            <h1>New BlogPost</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Escriba el titulo del Blog</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <label>Contenido del post</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <button type="submit">Publicar</button>
                </div>
            </form>
        </>
    )
}

export { NewBlogPostPage };