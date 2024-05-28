import React, { useState, useEffect } from 'react';
import ChatBox, { Message } from './ChatBox';
import '../../css/chat/ChatContainer.css';
import { io, Socket } from 'socket.io-client';
import ApiHelper from '../../helper/api-helper';
import { useUserContext } from '../context/UserContext';

const socket: Socket = io('http://localhost:3001');

const ChatContainerEmployee: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [owner, setOwner] = useState<any>({}); // Modify this type as per your User interface
  const { user } = useUserContext();


  useEffect(() => {
    const userId = user?.id; // Replace with the actual user ID
    if (userId) {
      socket.emit('joinRoom', userId);
    }

    socket.on('userToUserMessage', (data) => {
      console.log("Received data in employee: ", data);
      const { senderId, message, username } = data;
      setMessages((prevMessages) => [...prevMessages, { sender: username, text: message.text }]);
    });

    return () => {
      socket.off('userToUserMessage');
    };
  }, []);

  useEffect(() => {
    const getOwner = async () => {
      try {
        if (user && user.ownerId) {
          const getOwnerRes = await ApiHelper.getUserById({ id: user.ownerId });
          if (getOwnerRes.success && getOwnerRes.user) {
            setOwner(getOwnerRes.user);
          }
        }
      } catch (error) {
        console.error(`Error getting the owner: ${error}`);
      }
    };

    getOwner();
  }, [user?.ownerId]);

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() !== '') {
      const message: Message = { sender: String(user?.username), text: newMessage };
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit('userToUserMessage', {
        senderId: user?.id, 
        receiverId: owner.id, 
        username: user?.username,
        message,
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">{owner?.username}</div>
      <ChatBox messages={messages} onSendMessage={handleSendMessage} selectedUser={owner} />
    </div>
  );
};

export default ChatContainerEmployee;
