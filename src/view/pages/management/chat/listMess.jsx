import React, { useEffect, useState } from 'react';
import messagesApi from '../../../../api/messagesApi';
import { Modal } from 'antd';
import Chat from '../chat/chat';
import moment from 'moment';
import { connectSocket, disconnectSocket, onNewMessage, offNewMessage } from '../../../../hooks/socket';
import './chat.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch initial chat list
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messagesApi.getListMessages();
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    // Kết nối WebSocket
    connectSocket();

    // Lắng nghe sự kiện tin nhắn mới
    onNewMessage((newMessage) => {
      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        const existingChatIndex = updatedChats.findIndex(
          (chat) =>
            (chat.sender.id === newMessage.senderId &&
              chat.receiver.id === newMessage.receiverId) ||
            (chat.sender.id === newMessage.receiverId &&
              chat.receiver.id === newMessage.senderId)
        );

        if (existingChatIndex !== -1) {
          // Cập nhật nội dung tin nhắn cuối cùng
          updatedChats[existingChatIndex] = {
            ...updatedChats[existingChatIndex],
            content: newMessage.content,
            timestamp: new Date().toISOString(),
          };
        } else {
          // Thêm cuộc trò chuyện mới
          updatedChats.unshift({
            sender: { id: newMessage.senderId, userName: 'New User', avatar: '' },
            receiver: { id: newMessage.receiverId },
            content: newMessage.content,
            timestamp: new Date().toISOString(),
          });
        }

        return updatedChats;
      });
    });

    return () => {
      // Ngắt kết nối WebSocket khi component bị unmount
      offNewMessage();
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
