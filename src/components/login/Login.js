import React from 'react'
import {Form, Button, Container } from 'react-bootstrap'
import { FaGoogle } from 'react-icons/fa';

export default function Login() {

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
                <Button><FaGoogle/><span>Login with Google</span></Button>
            </Container>
            {/* <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Container> */}
            
        </div>
    )
}
