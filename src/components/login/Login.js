import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
    return (
        <div>
            <Container className="mt-4">
                <Form>
                    <Row>
                        <h5>Log in</h5>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>

        </div>
    )
}
