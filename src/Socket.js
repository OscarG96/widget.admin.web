import React from 'react';
import io from 'socket.io-client'   
import { getCookie } from './helpers/cookies';
const URL = '127.0.0.1:3000'
const token = getCookie('token')

export const socket = io(URL, { auth: { token} });
export const SocketContext = React.createContext()