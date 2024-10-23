import { useState } from 'react';
import { Input, Button, List, Avatar, Typography } from 'antd';
import '../chat/chat.css';
const { TextArea } = Input;
const { Text } = Typography;

export default function Chat() {
	// Dữ liệu tin nhắn
	const [messages, setMessages] = useState([
		{
			sender: 'Admin',
			text: 'Hello! How can I help you today?',
			avatar: 'https://via.placeholder.com/50',
		},
	]);

	// Lưu tin nhắn nhập
	const [inputValue, setInputValue] = useState('');

	// Gửi tin nhắn
	const sendMessage = () => {
		if (inputValue.trim() === '') return;
		const newMessage = {
			sender: 'You',
			text: inputValue,
			avatar: 'https://via.placeholder.com/50',
		};
		setMessages([...messages, newMessage]);
		setInputValue(''); // Xoá input sau khi gửi
	};

	return (
		<div className="chat-container">
			<h1>Chat Box</h1>

			{/* Danh sách tin nhắn */}
			<List
				className="message-list"
				itemLayout="horizontal"
				dataSource={messages}
				renderItem={(item) => (
					<List.Item className={item.sender === 'You' ? 'you' : 'admin'}>
						<List.Item.Meta
							avatar={<Avatar src={item.avatar} />}
							title={<Text strong>{item.sender}</Text>}
							description={item.text}
						/>
					</List.Item>
				)}
			/>

			{/* Khung nhập tin nhắn */}
			<div className="input-container">
				<TextArea
					rows={2}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter your message..."
				/>
				<Button type="primary" onClick={sendMessage}>
					Send
				</Button>
			</div>
		</div>
	);
}
