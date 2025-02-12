import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const adminList = ['Irisval', 'RetaxMaster', 'Freddier']

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [blogdata, setBlogdata] = React.useState([
        {
            title: "¿Qué es React?",
            slug: "que-es-react",
            content: "React es el mejor framework de JavaScript.",
            author: "juandc",
        },
        {
            title: "¿Qué es Vue?",
            slug: "que-es-vue",
            content: "Vue es el mejor framework de JavaScript.",
            author: "diannerd",
        },
        {
            title: "¿Qué es Angular?",
            slug: "que-es-angular",
            content: "Angular es el mejor framework de JavaScript.",
            author: "nicobytes",
        },
    ])

    const login = ({ username }) => {
        const isAdmin = adminList.find(admin => admin === username);
        setUser({ username, isAdmin }); 
    }

    const logout = () => {
        setUser(null)
        navigate('/')
    }

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize("NFD") // Elimina acentos
            .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
            .replace(/[¿?¡!]/g, "") // Elimina signos de interrogación/exclamación
            .replace(/\s+/g, "-") // Reemplaza espacios con guiones
            .replace(/[^a-z0-9\-]/g, ""); 
    } 

    const addBlogPost = (title, content) => {
        if (!user) return;

        const slug = generateSlug(title)
        const newPost = { title, slug, content, author: user.username};

        setBlogdata([...blogdata, newPost]);
        navigate('/blog');
    }

    const deleteBlogPost = (slug) => {
        setBlogdata(prevBlogdata => prevBlogdata.filter(post => post.slug !== slug));
        navigate('/blog')
    }

    const editBlogPost = (slug, newTitle, newContent) => {
        setBlogdata(prevBlogdata => prevBlogdata.map(post => 
            post.slug === slug ? 
            {...post, title: newTitle, content: newContent} : post
        ))
    }

    const auth = { user, login, logout, blogdata, addBlogPost, deleteBlogPost, editBlogPost };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const auth = React.useContext(AuthContext);
    return auth;
}

function AuthRoute(props) {
    const auth = useAuth()

    if (!auth.user) {
        return <Navigate to='/login'/>
    }

    return props.children;
}

export {
    AuthProvider,
    AuthRoute,
    useAuth,
}