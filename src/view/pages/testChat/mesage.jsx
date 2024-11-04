import React from 'react';

function Message({ message }) {
    return (
        <div>
            {message?.map((msg, index) => (
                <div key={index}>{msg}</div>
            ))}
        </div>
    );
}

export default Message;
