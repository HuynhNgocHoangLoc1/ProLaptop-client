import React, { useEffect, useState } from 'react';
import messagesApi from '../../../../api/messagesApi';
import { Modal } from 'antd';
import Chat from '../chat/chat';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import './chat.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
          <img src={chat.sender.avatar} alt="Avatar" style={styles.avatar} />
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
  closeIcon: {
    fontSize: '16px',
    color: '#888',
    cursor: 'pointer',
  },
};

export default ChatList;
