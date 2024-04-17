import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const current_endpoint = `${import.meta.env.VITE_API_URL}posts/`;

export default function PostsView() {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    
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

    const toggleLike = async(postId) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}post/${postId}/like/`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            });

            if (response.data.liked) {
                document.getElementById(`button-like-${postId}`).innerHTML = 'Unlike'
            } else {
                document.getElementById(`button-like-${postId}`).innerHTML = 'Like'
            }

            document.getElementById(`likes-count-${postId}`).innerHTML = `Likes: ${response.data.content.likes.length}`;

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='posts'>
            {posts.map((post) => (
                <div id={post.id}>
                    <h1>{post.title}</h1>
                    <strong>{post.content}</strong>
                    <mark id={`likes-count-${post.id}`}>Likes {post.likes.length}</mark>
                    <button id={`button-like-${post.id}`} onClick={() => toggleLike(post.id)}>like</button>
                </div>
            ))}
        </div>
    );
}