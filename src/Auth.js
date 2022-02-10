import React, { useEffect, useState } from 'react';
import app from './firebase.init'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setCookie } from './helpers/cookies';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('auth state changed', user)
            setCurrentUser(user)
            setCookie('token', user.uid, 7)
            setPending(false)
        }, (error) => {
            console.error(error)
        })
    }, [])

    if(pending){
        return <>Loading...</>
    }

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