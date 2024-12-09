import React, { useEffect, useState } from 'react';
import ChatUI, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { Modal } from 'antd';
import messagesApi from '../../../../api/messagesApi';
import './chat.css';
import { connectSocket, disconnectSocket, sendMessage, onNewMessage, offNewMessage } from '../../../../hooks/socket';

export default function Chat({ userId, onOpen, setOnOpen, senderId, receiverId }) {
  const { messages, appendMsg } = useMessages([]);
  const admin = '474c4675-3050-4e00-8c86-38c3347c9ea6';  // Đặt ID admin
  const [content, setContent] = useState('');

  // Kết nối và ngắt kết nối socket
  useEffect(() => {
    connectSocket();

    onNewMessage((newMessage) => {
      console.log('New message received:', newMessage);
      if (newMessage.receiverId === admin && newMessage.senderId !== admin) {
        const position = newMessage.senderId === userId ? 'left' : 'right';
        appendMsg({
          type: 'text',
          content: { text: newMessage.content },
          position,
        });
      }
    });

    return () => {
      offNewMessage();
      disconnectSocket();
    };
  }, [userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messagesApi.getMessages(userId, senderId, receiverId);
        response.data.forEach((msg) => {
          if (msg.senderId !== admin) {
            const position = msg.senderRole === 'admin' ? 'right' : 'left';
            appendMsg({
              type: 'text',
              content: { text: msg.content },
              position,
            });
          }
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (userId) {
      fetchMessages();
    }
  }, [userId, senderId, receiverId]);

  const handleSend = async (type, val) => {
    if (type === 'text' && val.trim()) {
      const newMessage = {
        senderId: admin,
        receiverId: userId,
        content: val,
      };

      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      try {
        sendMessage(newMessage);
        console.log('Message sent successfully');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  function renderMessageContent(msg) {
    const { content, position } = msg;
    return (
      <Bubble
        content={content.text}
        className={position === 'right' ? 'admin-bubble' : 'user-bubble'}
      />
    );
  }

  return (
    <Modal
      title="Chat with Admin"
      open={onOpen}
      visible={true}
      footer={null}
      width={600}
      bodyStyle={{ padding: 0 }}
      className="chat-modal"
      onCancel={() => setOnOpen(false)}
    >
      <div className="chat-container">
        <div className="message-list">
          <ChatUI
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
            locale={{
              send: 'Send', // Đổi nút gửi tin nhắn thành 'Send'
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
