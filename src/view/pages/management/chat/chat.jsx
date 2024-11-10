import React, { useEffect, useState } from 'react';
import ChatUI, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { Modal } from 'antd';
import messagesApi from '../../../../api/messagesApi';
import './chat.css';
import { connectSocket, disconnectSocket, sendMessage, onNewMessage, offNewMessage } from '../../../../hooks/socket';

export default function Chat({ userId, onOpen, setOnOpen, senderId, receiverId }) {
  const { messages, appendMsg } = useMessages([]);
  const admin = '1d9c91b5-404c-4e26-9ba8-ed571a037cb1';  // Đặt ID admin
  const [content, setContent] = useState('');

  // Kết nối và ngắt kết nối socket
// Kiểm tra lại sự kiện onNewMessage ở phía admin
useEffect(() => {
  connectSocket();

  // Lắng nghe sự kiện "receive_message" khi có tin nhắn mới
  onNewMessage((newMessage) => {
    console.log('New message received from user:', newMessage);

    // Kiểm tra nếu tin nhắn đến từ người dùng và người nhận là admin
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


  // Tải danh sách tin nhắn từ API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messagesApi.getMessages(userId, senderId, receiverId);
        response.data.forEach((msg) => {
          // Không hiển thị tin nhắn của admin trong danh sách ban đầu
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

  // Hàm gửi tin nhắn từ admin
// Hàm gửi tin nhắn từ admin
const handleSend = async (type, val) => {
  if (type === 'text' && val.trim()) {
    const newMessage = {
      senderId: admin,   // Admin là người gửi
      receiverId: userId, // Người nhận là người dùng
      content: val,
    };

    // Cập nhật tin nhắn vào UI ngay lập tức (chỉ hiển thị bên admin)
    appendMsg({
      type: 'text',
      content: { text: val },
      position: 'right',  // Đặt tin nhắn của admin ở bên phải
    });

    try {
      // Gửi tin nhắn qua WebSocket
      sendMessage(newMessage);

      // Gửi tin nhắn tới database
      await messagesApi.sendMessage(newMessage);

      console.log('Message sent successfully and saved to database');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};

  // Render tin nhắn
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
            locale="en-US" // Đặt ngôn ngữ là tiếng Anh
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
          />
        </div>
      </div>
    </Modal>
  );
}
