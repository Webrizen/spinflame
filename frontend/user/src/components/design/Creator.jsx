"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Creator({ id }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/auth/users/${id}`);
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <span>@{user.username}</span>
    );
}