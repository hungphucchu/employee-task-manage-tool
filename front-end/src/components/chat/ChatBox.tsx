import React, { useState } from "react";
import "../../css/chat/ChatBox.css";

export interface Message {
  text: string;
  sender: string;
}

interface ChatBoxProps {
  selectedUser: { id: string; name: string } | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedUser,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  if (!selectedUser) {
    return <div className="chat-box">Select a user to chat with</div>;
  }

  return (
    <div className="chat-box">
      <div className="chat-header">{selectedUser.name}</div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "You" ? "you" : "user"}`}
          >
            <strong>{message.sender}: </strong> {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
