import React, { useEffect, useState } from 'react';
import messagesApi from '../../../../api/messagesApi';
import Chat from '../chat/chat';
import moment from 'moment';
import { connectSocket, disconnectSocket, onNewMessage, joinRoom } from '../../../../hooks/socket';
import './chat.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch initial chat list
  useEffect(() => {
    let active = true;
    const fetchMessages = async () => {
      try {
        const response = await messagesApi.getListMessages();
        if (active) setChats(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    // Kết nối WebSocket
    connectSocket();

    messagesApi.getAdminId()
      .then((adminId) => {
        if (active) joinRoom(adminId);
      })
      .catch((error) => console.error('Error joining admin chat room:', error));

    const unsubscribe = onNewMessage((newMessage) => {
      const senderId = newMessage.senderId || newMessage.sender?.id;
      const receiverId = newMessage.receiverId || newMessage.receiver?.id;
      if (!senderId || !receiverId) return;

      setChats((prevChats) => {
        const existingChatIndex = prevChats.findIndex((chat) => {
          const chatSenderId = chat.sender?.id;
          const chatReceiverId = chat.receiver?.id;
          return (
            (chatSenderId === senderId && chatReceiverId === receiverId) ||
            (chatSenderId === receiverId && chatReceiverId === senderId)
          );
        });

        if (existingChatIndex !== -1) {
          const updatedChats = [...prevChats];
          updatedChats[existingChatIndex] = {
            ...updatedChats[existingChatIndex],
            content: newMessage.content,
            sender: newMessage.sender || updatedChats[existingChatIndex].sender,
            receiver: newMessage.receiver || updatedChats[existingChatIndex].receiver,
            senderRole: newMessage.senderRole || updatedChats[existingChatIndex].senderRole,
            timestamp: new Date().toISOString(),
          };
          return updatedChats;
        } else {
          return [{
            ...newMessage,
            sender: newMessage.sender || { id: senderId, userName: 'New User', avatar: '' },
            receiver: newMessage.receiver || { id: receiverId },
            content: newMessage.content,
            timestamp: new Date().toISOString(),
          }, ...prevChats];
        }
      });
    });

    return () => {
      // Ngắt kết nối WebSocket khi component bị unmount
      active = false;
      unsubscribe();
      disconnectSocket();
    };
  }, []);

  const openChat = (chat) => {
    const userId = chat.senderRole === 'user' ? chat.sender.id : chat.receiver.id;
    setSelectedUserId(userId);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div style={styles.chatListContainer}>
      {chats.map((chat, index) => (
        <div key={index} style={styles.chatItem} onClick={() => openChat(chat)}>
          <img src={chat.sender.avatar || '/default-avatar.png'} alt="Avatar" style={styles.avatar} />
          <div style={styles.chatContent}>
            <div style={styles.chatHeader}>
              <span style={styles.chatName}>
                {chat.sender.userName === 'admin' ? 'You' : chat.sender.userName}
              </span>
              <span style={styles.time}>
                {moment(chat.timestamp).format('h:mm A')}
              </span>
            </div>
            <span style={styles.messagePreview}>{chat.content}</span>
          </div>
        </div>
      ))}
      {isChatOpen && <Chat userId={selectedUserId} open={isChatOpen} setOnOpen={closeChat} />}
    </div>
  );
};

const styles = {
  chatListContainer: {
    width: '100%',
    padding: '10px',
  },
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontWeight: 'bold',
  },
  messagePreview: {
    color: '#555',
  },
  time: {
    fontSize: '12px',
    color: '#888',
  },
};

export default ChatList;
