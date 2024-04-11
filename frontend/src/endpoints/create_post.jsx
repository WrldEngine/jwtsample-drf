import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const current_endpoint = `${import.meta.env.VITE_API_URL}posts/`

export default function CreatePostForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        errors: {},
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.title) {
            errors.title = "Title is required";
        }

        if (!formData.content) {
            errors.content = "Content is required";
        }

        setFormData((prevState) => ({ ...prevState, errors }));

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async(event) => {
        const errors = {};
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post(current_endpoint, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                });
                navigate('/posts');

            } catch(error) {
                navigate('/registration');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type='text' name='title' value={formData.title} onChange={handleChange} />
                {formData.errors.title && (
                    <p style={{ color: "red" }}>{formData.errors.title}</p>
                )}
            </label>
            <label>
                Content:
                <textarea type='text' name='content' value={formData.content} onChange={handleChange} />
                {formData.errors.content && (
                    <p style={{ color: "red" }}>{formData.errors.content}</p>
                )}
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}