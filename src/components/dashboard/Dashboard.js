import React from 'react'
import './dashboard.css'
import { Tab, Row, ListGroup, Col, Form, Button, Badge } from 'react-bootstrap'
import { useState, useEffect } from 'react';
const { io } = require("socket.io-client");


export default function Dashboard() {
    const [userSelected, selectUser] = useState({})
    const socket = io('127.0.0.1:3000')

    socket.on('agent', (data) => {
        console.log(data);
    })

    const handleSubmitMessage = (message) => {
        console.log('handle submit message', message)
        socket.emit('message', { message })
    }

    const users = [
        {
            name: 'Oscar',
            messages: [
                'Hello',
                'I might need some help with something'
            ]
        },
        {
            name: 'Ricardo',
            messages: [
                'Hola',
                'A mi no me gusta el ingles',
                'Tu sabes español? :)'
            ]
        }
    ]

    // handleSubmitMessage('hello')
    // useEffect(() => {
    //     console.log(userSelected)
    //     return () => {
    //         // cleanup
    //     }
    // }, [])

    return (
        <div className='chatWindow'>
            <header>
                Company's name
            </header>
            <Tab.Container id="list-group-tabs-example" >
                <Row style={{ height: "92%" }}>
                    <Col sm={4}>
                        <ListGroup>
                            {
                                users.map(user => (
                                    <ListGroup.Item action onClick={() => { }}>
                                        {user.name}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Col>
                    <Col sm={8} className='d-flex'>
                        <Tab.Content>
                            <Tab.Pane style={{ height: "80%" }} eventKey="#link1">
                                {
                                    Object.keys(userSelected).length > 0 ? userSelected.messages.map(message => (
                                        <Badge pill bg="secondary">
                                            {message}
                                        </Badge>
                                    )) : ""
                                }


                            </Tab.Pane>
                        </Tab.Content>
                        <Form style={{alignSelf: 'flex-end'}}>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                                        Name
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        id="inlineFormInput"
                                        placeholder="Jane Doe"
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" className="mb-2">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
