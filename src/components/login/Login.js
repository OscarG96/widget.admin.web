import React from 'react'
import { Button } from 'react-bootstrap'
import { FaGoogle } from 'react-icons/fa';
import './login.css'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {

    const googleLogin = () => {
        console.log('about to login')
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                
            });
    }

    return (
        
        <div >
        <header id="showcase">
            <h1>Welcome To The Widget App</h1>
            <p>Before you start, please login with the button below</p>
            <Button onClick={() => googleLogin()} variant="outline-dark"><i><FaGoogle /></i> Login with Google</Button>
        </header>
        </div >
    )
}
