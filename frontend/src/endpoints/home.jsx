import React, { useState, useEffect } from 'react';
import axios from 'axios';

const current_endpoint = `${import.meta.env.VITE_API_URL}users/show/`

export default function HomeUsersView() {
    const [users, setUsersdata] = useState([]);
    
    const fetchData = async() => {
        try {
            const response = await axios.get(current_endpoint);
            setUsersdata(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className='users_table'>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>bio</th>
                        <th>location</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.bio_link}</td>
                            <td>{user.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}