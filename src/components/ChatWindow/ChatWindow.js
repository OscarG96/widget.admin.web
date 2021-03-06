import React, { useContext, useEffect, useRef, useCallback, useReducer } from 'react'
import { useState } from 'react'
import './chatwindow.css'
import { AuthContext } from '../../Auth.js'
import NavbarWrapper from '../navbar/NavbarWrapper'
import { SocketContext } from '../../Socket'
import { getCookie } from '../../helpers/cookies'
import io from 'socket.io-client'

function reducer(state, data) {
    let userFound = state.find(chat => chat.uuid === data.uuid)
    if (userFound) {
        const updatedUser = {
            ...userFound,
            messages: [...userFound.messages, { text: data.message, type: data.type }]
        }
        const updatedObject = state.map(chat =>
            chat.uuid === data.uuid ? updatedUser : chat
        )
        return updatedObject

    } else {
        //append user
        const updateChatLists = [
            ...state,
            {
                name: data.username,
                messages: [{
                    text: data.message,
                    type: data.type
                }],
                uuid: data.uuid

            }
        ]

        return updateChatLists
    }
}

const initialState = { list: [] };
const socket = io('127.0.0.1:3000')
export default function ChatWindow({ initialCount }) {
    // const socket = useContext(SocketContext)
    const { currentUser } = useContext(AuthContext);
    const [currentchat, setCurrentChat] = useState('')
    const [chatLists, setChatLists] = useState([])
    const inputEl = useRef(null)
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        // const socket = io('127.0.0.1:3000')
        socket.on(`agent-${currentUser.uid}`, (data) => {
            console.log('message from websocket', data);
            data.type = 'received'
            dispatch(data)
        })
    }, []);

    const sendMessageToSocket = (message) => {
        // const socket = io('127.0.0.1:3000')
        console.log('send message to socket', message)
        const agent = getCookie('token')
        let data = { message, uuid: currentchat, type: 'sent', agent }
        socket.emit("message-agent", data);
        dispatch(data)
        inputEl.current.value = ''
    };




    return (
        <>
            <NavbarWrapper />


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
                                    state.map(chat => (
                                        <a href="#" className="list-group-item list-group-item-action border-0" key={chat.uuid} onClick={() => setCurrentChat(chat.uuid)}>
                                            {/* <div className="badge bg-success float-right">5</div> */}
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
                                <div className="py-2 px-4 border-bottom d-none d-lg-block chat-header">
                                    <div className="d-flex align-items-center py-1">
                                        {/* <div className="position-relative">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                    </div> */}
                                        <div className="flex-grow-1 pl-3">
                                            <strong>{ state.length > 0 && currentchat && state.find(chat => chat.uuid == currentchat).name }</strong>

                                        </div>

                                    </div>
                                </div>

                                <div className="position-relative">
                                    <div className="chat-messages p-4">

                                        {
                                        state.length > 0 && currentchat && state.find(chat => chat.uuid === currentchat).messages.map(message => {
                                            if (message.type === 'sent') {
                                                return (
                                                    <div className="chat-message-right pb-4">
                                                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                                            <div className="font-weight-bold mb-1">You</div>
                                                            {message.text}
                                                        </div>
                                                    </div>

                                                )
                                            } else {
                                                return (<div className="chat-message-left pb-4">
                                                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                        <div className="font-weight-bold mb-1">{state.find(chat => chat.uuid === currentchat).name}</div>
                                                        {message.text}
                                                    </div>
                                                </div>)
                                            }
                                        })
                                    }

                                    </div>
                                </div>

                                <div className="flex-grow-0 py-3 px-4 border-top chat-footer">
                                    <div className="input-group">
                                        <input ref={inputEl} type="text" className="form-control" placeholder="Type your message" />
                                        <button onClick={() => sendMessageToSocket(inputEl.current.value)} className="btn btn-primary">Send</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
