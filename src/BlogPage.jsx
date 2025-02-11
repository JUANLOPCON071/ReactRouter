import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

function BlogPage() {
    const auth = useAuth();
    
    return (
        <>
            <h1>BlogPage</h1>

            <Outlet/>

            <ul>
                {auth.blogdata.map(post => (
                    <BlogLink key={post.slug} post={post}/>
                ))}
            </ul>

            {auth.user && (
                <Link to='/newblog'>
                    <button>Crear blogpost</button>
                </Link>
            )}
        </>
    )
}

function BlogLink({ post }) {
    return (
        <li>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
    )
}

export { BlogPage };