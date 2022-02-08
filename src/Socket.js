import React from 'react';
import socketio from 'socket.io-client'
const URL = '127.0.0.1:3000'

export const socket = socketio.connect(URL);
export const SocketContext = React.createContext()