import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function PostsView() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const current_endpoint = `${import.meta.env.VITE_API_URL}posts/`;
    console.log(localStorage.getItem('access'))
    
    const fetchData = async() => {
        try {
            const response = await axios.get(current_endpoint, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            });
            setPosts(response.data);

        } catch (error) {
            navigate('/login');
        }
    }

    const toggleLike = async (postId) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}post/${postId}/like/`, {
                header: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className='posts'>
            {posts.map((post) => (
                <div id={post.id}>
                    <h1>{post.title}</h1>
                    <strong>{post.content}</strong>
                    <mark>Likes {post.likes}</mark>
                    <button onClick={() => toggleLike(post.id)}>LIKE</button>
                </div>
            ))}
        </div>
    );
}