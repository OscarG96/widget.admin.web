import React from 'react'
import {Form, Button, Container } from 'react-bootstrap'
import { FaGoogle } from 'react-icons/fa';

export default function Home() {

    const divStyle = {
        backgroundImage: 'url(' + 'https://firebasestorage.googleapis.com/v0/b/petrolhead-app.appspot.com/o/public%2FIMG_6089.JPG?alt=media&token=0351bd96-e2af-4a25-b7e2-91048845a823' + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        // padding: '0', '20px',
    };

    return (
        <div style={divStyle}>
            <Container>
                <Button href="/login" variant="outline-secondary">Log in</Button>{' '}
                <Button href="/login" variant="secondary">Sign up</Button>{' '}
            </Container>
        </div>
    )
}
