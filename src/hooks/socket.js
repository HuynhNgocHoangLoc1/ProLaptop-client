import io from 'socket.io-client';
import messagesApi from '../api/messagesApi';
import { SERVER_URL } from '../config/env';

let socket;
const joinedRooms = new Set();

export const connectSocket = () => {
  if (!socket) {
    socket = io(SERVER_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5, // Số lần thử kết nối lại
    });

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
      joinedRooms.forEach((roomId) => socket.emit('joinRoom', { userId: roomId }));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    socket.on('error', (error) => {
      console.error('Socket encountered error:', error);
    });

    socket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });
  } else if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    joinedRooms.clear();
    console.log('Disconnected from socket server');
  }
};

// export const sendMessage = (message) => {
//   if (socket && isConnected) { // Chỉ gửi tin nhắn nếu đã kết nối
//     socket.emit('send_message', message);
//     console.log('Message sent:', message);
//   } else {
//     console.warn('Socket is not connected, cannot send message');
//   }
// };

export const joinRoom = (userId) => {
  if (userId) {
    joinedRooms.add(userId);
  }
  if (socket?.connected && userId) {
    socket.emit('joinRoom', { userId });
  }
};

export const sendMessage = async (message) => {
  if (socket) {
    try {
      const response = await messagesApi.send(message);
      const savedMessage = {
        ...response.data,
        senderId: message.senderId,
        receiverId: message.receiverId,
      };
      socket.emit('sendMessage', savedMessage);
      console.log('Message sent:', savedMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  } else {
    console.error('Socket is not connected');
  }
};


export const onNewMessage = (callback) => {
  if (socket) {
    socket.on('receive_message', callback);
    return () => socket?.off('receive_message', callback);
  }
  return () => {};
};

export const offNewMessage = (callback) => {
  if (socket && callback) {
    socket.off('receive_message', callback);
  }
};
