import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'; 
import MessageInput from './messageInput';
import Message from './mesage';
import AccountContext from '../../../context/accountContext';
import { useContext } from 'react';
function TestChat() {
    const [socket, setSocket] = useState();
    const {account} = useContext(AccountContext);
    console.log("account", account);
    const [messages, setMessages] = useState([]); // Đổi tên từ message thành messages để rõ ràng hơn

    const send = (value) => {
        const userId = account.id; // Get the user ID from account context
        if (userId && value) {
            socket?.emit('newMessage', { userId, content: value }); // Include both userId and the message content
        }
    };
    

    useEffect(() => {
        const newSocket = io('http://localhost:5003');
    
        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });
    
        newSocket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });
    
        newSocket.on('connect_timeout', (timeout) => {
            console.error('Connection Timeout:', timeout);
        });
    
        setSocket(newSocket);
        
        return () => {
            newSocket.disconnect(); // Ngắt kết nối khi component unmount
        };
    }, []);
    console.log("MSG",messages);

 

    const messageListener = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]); // Cập nhật messages
    };

    useEffect(() => {
        socket?.on('onMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message.content]); // Cập nhật messages
        });
        return () => {
            socket?.off('onMessage'); // Ngắt lắng nghe khi component unmount
        };
    }, [socket]);
    

    return (
        <>
            <MessageInput send={send} /> 
            <Message messages={messages} />
        </>
    );
}

export default TestChat;
