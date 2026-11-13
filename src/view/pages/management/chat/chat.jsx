import React, { useEffect, useRef, useState } from 'react';
import ChatUI, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { Modal } from 'antd';
import messagesApi from '../../../../api/messagesApi';
import './chat.css';
import { connectSocket, sendMessage, onNewMessage, joinRoom } from '../../../../hooks/socket';

export default function Chat({ userId, onOpen, setOnOpen, senderId, receiverId }) {
  const { messages, appendMsg } = useMessages([]);
  const [adminId, setAdminId] = useState(null);
  const [content, setContent] = useState('');
  const seenMessageIds = useRef(new Set());

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const id = await messagesApi.getAdminId();
        setAdminId(id);
      } catch (error) {
        console.error('Error fetching admin id:', error);
      }
    };

    fetchAdminId();
  }, []);

  useEffect(() => {
    if (!adminId) return;

    connectSocket();
    joinRoom(adminId);

    const unsubscribe = onNewMessage((newMessage) => {
      console.log('New message received:', newMessage);
      if (!userId || !newMessage) return;

      // Chỉ hiển thị tin nhắn của user đang mở chat với admin
      if (
        newMessage.receiverId === adminId &&
        newMessage.senderId === userId
      ) {
        if (newMessage.id && seenMessageIds.current.has(newMessage.id)) return;
        if (newMessage.id) seenMessageIds.current.add(newMessage.id);
        appendMsg({
          type: 'text',
          content: { text: newMessage.content },
          position: 'left',
        });
      }

    });

    return () => {
      unsubscribe();
    };
  }, [adminId, userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!userId || !adminId) return;

        const response = await messagesApi.getMessages(userId, adminId);
        response.data.forEach((msg) => {
          if (msg.id && seenMessageIds.current.has(msg.id)) return;
          if (msg.id) seenMessageIds.current.add(msg.id);
          const position = msg.senderRole === 'admin' ? 'right' : 'left';
          appendMsg({
            type: 'text',
            content: { text: msg.content },
            position,
          });
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (userId) {
      fetchMessages();
    }
  }, [userId, adminId, senderId, receiverId]);

  const handleSend = async (type, val) => {
    if (type === 'text' && val.trim() && adminId) {
      const newMessage = {
        senderId: adminId,
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
