import React from 'react';
import { UserProvider } from '@/context/UserContext';

export default function AuthProvider({ children }) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}