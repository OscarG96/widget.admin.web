import React, { useEffect, useState } from 'react';
import app from './firebase.init'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        }, (error) => {
            console.error(error)
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}