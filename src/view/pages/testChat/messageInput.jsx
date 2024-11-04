import React, { useState } from 'react';

function MessageInput({ send }) {
    const [value, setValue] = useState("");
    console.log("VALUE", value);
    const handleSend = () => {
        if (value.trim()) { // Kiểm tra xem input không trống
            send(value); // Gọi hàm send với giá trị hiện tại
            setValue(""); // Xóa input sau khi gửi
        }
    };

    return (
        <>
            <input
                placeholder="Nhập tin nhắn..."
                value={value}
                onChange={(e) => setValue(e.target.value)} // Cập nhật state khi người dùng nhập
            />
            <button onClick={handleSend}>Gửi</button>
        </>
    );
}

export default MessageInput;
