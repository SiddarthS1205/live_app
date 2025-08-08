import React, { useState, useEffect } from 'react'
import { FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import ChatLists from './ChatLists'
import InputText from './InputText'
import UserLogin from './UserLogin'
import socketIOClient from 'socket.io-client';

const ChatContainer = () => {
    const [user, setUser] = useState(localStorage.getItem('user'))
    const socketio = socketIOClient('http://localhost:3001');
    const [chats, setChats] = useState([])

useEffect(() => {
  socketio.on('chat', (senderChat) => {
    setChats((prevChats) => [...prevChats, senderChat]);
  });

  return () => {
    socketio.off('chat'); 
  };
}, []);

const sendToSocket = (chat) => {
    socketio.emit('chat', chat);
};

    const addMessage = (chat)  => {
        const newChat = {
            ...chat,
             user: localStorage.getItem('user'),
             avatar: localStorage.getItem('avatar'),
            };
            sendToSocket(newChat);
    };

    const Logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('avatar')
        setUser(null);
    };

    return ( 
        <div>
            {user ? (
            <div>
                <div className='chats_header'>
                    <h4>
                        Username: <span style={{color:'teal'}}>{user}</span>
                    </h4>
                    <p>
                        <FaWhatsapp className='chats_icon' /> Online Chat
                    </p>
                    <p className='chats_logout' onClick={Logout}>
                        <strong>Logout</strong>
                    </p>
                </div>
                <ChatLists  chats= {chats}/>
                <InputText addMessage={addMessage} />
            </div>
            ): 
            <UserLogin setUser = {setUser} />
        }
        </div>
    )
}

export default ChatContainer;
 