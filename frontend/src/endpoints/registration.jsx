import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const current_endpoint = `${import.meta.env.VITE_API_URL}users/register/`

export default function RegForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        bio_link: "",
        location: "",
        errors: {},
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username) {
            errors.username = "Username is required";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        }

        setFormData((prevState) => ({ ...prevState, errors }));

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async(event) => {
        const errors = {};
        event.preventDefault();
        
        if (validateForm()) {
            try {
                await axios.post(current_endpoint, formData);
                navigate("/login");
            } catch(error) {
                errors.auth = "Maybe username is already exists";
                setFormData((prevState) => ({ ...prevState, errors }));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {formData.errors.auth && (
                <p style={{ color: "red" }}>{formData.errors.auth}</p>
            )}
            <label>
                Username:
                <input type='text' name='username' value={formData.username} onChange={handleChange} />
                {formData.errors.username && (
                    <p style={{ color: "red" }}>{formData.errors.username}</p>
                )}
            </label>
            <label>
                bio_link:
                <input type='text' name='bio_link' value={formData.bio_link} onChange={handleChange} />
            </label>
            <label>
                location:
                <input type='text' name='location' value={formData.location} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type='password' name='password' value={formData.password} onChange={handleChange} />
                {formData.errors.password && (
                    <p style={{ color: "red" }}>{formData.errors.password}</p>
                )}
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}