import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './chatwindow.css'
import { AuthContext } from '../../Auth.js'

export default function ChatWindow() {
    const { io } = require("socket.io-client");
    
    const { currentUser } = useContext(AuthContext);
    const [currentchat, setCurrentChat] = useState('')
    const [chatLists, setChatLists] = useState([])

    const agentId = '1';
    const [input, setInput] = useState('');

    

    const appendMessageToList = (data) => {
        console.log(data)
        console.log(chatLists)

        let userFound = chatLists.find(chat => chat.uuid === data.uuid)
        if (userFound) {
            const updatedUser = {
                ...userFound,
                messages: [ ...userFound.messages, { text: data.message, type: 'received' } ]
            }
            const updatedObject = chatLists.map(chat => 
                chat.uuid === data.uuid ? updatedUser : chat
            )
            setChatLists(updatedObject)
            
        } else {
            //append user
            const updateChatLists = [
                ...chatLists,
                {
                    name: data.username,
                    messages: [{
                        text: data.message,
                        type: 'received'
                    }],
                    uuid: data.uuid
    
                }
            ]

            setChatLists(updateChatLists)
        }
        
    }
    // const appendMessageToList = (data) => {

    //     setChatLists([...chatLists, data.message])
    // }

    

    const rooms = [
        {
            name: 'Oscar',
            messages: [
                {
                    text: 'hello there',
                    type: 'received'
                },
                {
                    text: 'Hello',
                    type: 'sent'
                }
            ],
            id: '3472983742-12093h'
        },
        {
            name: 'Ricardo',
            messages: [
                {
                    text: 'Hi, I was wondering if you could help me with something',
                    type: 'received'
                },
                {
                    text: 'Sure',
                    type: 'sent'
                }
            ],
            id: '182379124n-12o38u8o'
        }
    ]

   
    useEffect(() => {
        const socket = io('127.0.0.1:3000')
        socket.on(`agent-${currentUser.uid}`, (data) => {
            console.log(data);
            appendMessageToList(data)
        })

        return () => {
            socket.disconnect()
        }

        
    }, [chatLists]);

    useEffect(() => {

        console.log('current chat', currentchat)

        
    }, [currentchat]);

    const sendMessageToSocket = (message) => {
        const socket = io('127.0.0.1:3000')
        console.log('send message to socket', message)
        let data = { message, uuid: currentchat }
        socket.emit("message-agent", data);
    };

    // return (
    //     <div>div</div>
    // )


    return (
        <main className="content mt-5">
            <div className="container p-0">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-12 col-lg-5 col-xl-3 border-right chat-list">

                            <div className="px-4 d-none d-md-block">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <input type="text" className="form-control my-3" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>

                            {
                                chatLists.map(chat => (
                                    <a href="#" className="list-group-item list-group-item-action border-0" key={chat.uuid} onClick={() => setCurrentChat(chat.uuid)}>
                                        <div className="badge bg-success float-right">5</div>
                                        <div className="d-flex align-items-start">
                                            {/* <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" /> */}
                                            <div className="flex-grow-1 ml-3">
                                                {chat.name}
                                                <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            }
                            <hr className="d-block d-lg-none mt-1 mb-0" />
                        </div>
                        <div className="col-12 col-lg-7 col-xl-9">
                            <div className="py-2 px-4 border-bottom d-none d-lg-block">
                                <div className="d-flex align-items-center py-1">
                                    {/* <div className="position-relative">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                    </div> */}
                                    <div className="flex-grow-1 pl-3">
                                        {/* <strong>{currentchat ? chatLists.find(chat => chat.uuid == currentchat).name : ''}</strong> */}
                                        <div className="text-muted small"><em>Typing...</em></div>
                                    </div>

                                </div>
                            </div>

                            <div className="position-relative">
                                <div className="chat-messages p-4">

                                    {
                                        (currentchat && chatLists.length > 0) ?  chatLists.find(chat => chat.uuid == currentchat).messages.map(message => {
                                            if (message.type == 'sent') {
                                                return (
                                                    <div className="chat-message-right pb-4">
                                                        <div>
                                                            {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" /> */}
                                                            <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                                                        </div>
                                                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                                            <div className="font-weight-bold mb-1">You</div>
                                                            {message.text}
                                                        </div>
                                                    </div>

                                                )
                                            } else {
                                                return (<div className="chat-message-left pb-4">
                                                    <div>
                                                        {/* <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" /> */}
                                                        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                                                    </div>
                                                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                        <div className="font-weight-bold mb-1">{chatLists.find(chat => chat.uuid == currentchat).name}</div>
                                                        {message.text}
                                                    </div>
                                                </div>)
                                            }
                                        }) : <p>No messages</p>
                                    }

                                </div>
                            </div>

                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <div className="input-group">
                                    <input value={input} onInput={e => setInput(e.target.value)} type="text" className="form-control" placeholder="Type your message" />
                                    <button onClick={() => sendMessageToSocket(input)} className="btn btn-primary">Send</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
