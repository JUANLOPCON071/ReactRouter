import React from "react";
import { Link } from "react-router-dom";

function BlogPage() {
    return (
        <>
            <h1>BlogPage</h1>

            <ul>
                {blogdata.map(post => (
                    <BlogLink post={post}/>
                ))}
            </ul>
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

const blogdata = [];
blogdata.push({
    title: '¿Que es React',
    slug: 'que-es-react',
    content: 'React es el mejor framework de JavaScript.',
    author: 'juandc',
});
blogdata.push({
    title: '¿Que es Vue',
    slug: 'que-es-vue',
    content: 'Vue es el mejor framework de JavaScript.',
    author: 'diannerd',
});
blogdata.push({
    title: '¿Que es Angular',
    slug: 'que-es-angular',
    content: 'Angular es el mejor framework de JavaScript.',
    author: 'nicobytes',
});

export { BlogPage };