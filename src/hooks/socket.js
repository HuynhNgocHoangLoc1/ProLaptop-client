import io from 'socket.io-client';
import messagesApi from '../api/messagesApi';

let socket;
const SERVER_URL = 'https://prolaptop-server.onrender.com'; // Đảm bảo URL chính xác của server WebSocket
let isConnected = false; // Biến trạng thái để kiểm tra trạng thái kết nối

export const connectSocket = () => {
  if (!socket || !isConnected) { // Đảm bảo chỉ tạo một kết nối
    socket = io(SERVER_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5, // Số lần thử kết nối lại
    });

    socket.on('connect', () => {
      isConnected = true;
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('disconnect', () => {
      isConnected = false;
      console.log('Disconnected from socket server');
    });

    socket.on('error', (error) => {
      console.error('Socket encountered error:', error);
    });

    socket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    isConnected = false;
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

export const sendMessage = async (message) => {
  if (socket) {
    try {
      // Gửi tin nhắn qua socket
      socket.emit('sendMessage', message);
      console.log('Message sent via socket:', message);

      // Gửi tin nhắn qua API
      await messagesApi.send(message);
      console.log('Message sent via API:', message);
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
  }
};

export const offNewMessage = () => {
  if (socket) {
    socket.off('receive_message');
  }
};
