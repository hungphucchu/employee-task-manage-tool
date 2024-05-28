import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import ChatBox, { Message } from './ChatBox';
import '../../css/chat/ChatContainer.css';
import { io, Socket } from 'socket.io-client';
import { useEmployeeContext } from '../context/EmployeesContext';
import { useUserContext } from '../context/UserContext';
import { Employee } from '../../dto/common.dto';


const socket: Socket = io('http://localhost:3001');

const ChatContainerOwner: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const { employees } = useEmployeeContext();
  const { user } = useUserContext();

  console.log("selectedUser = ");
  console.log(selectedUser);
  console.log("messages = ");
  console.log(messages);

  useEffect(() => {
    if (user?.id) {
      socket.emit('joinRoom', user.id);
    }

    const initialMessages: { [key: string]: Message[] } = {};
    employees.forEach((employee) => {
      if (employee.userId) {
        initialMessages[employee.userId] = [];
      }
    });
    setMessages(initialMessages);

    socket.on('userToUserMessage', (data) => {
      console.log("Received data in owner: ", data);
      const { senderId, message } = data;
      setMessages((prevMessages) => ({
        ...prevMessages,
        [senderId]: [...(prevMessages[senderId] || []), { text: message.text }],
      }));
    });

    return () => {
      socket.off('userToUserMessage');
    };
  }, []);

  const handleSendMessage = (newMessage: string) => {
    if (selectedUser && newMessage.trim() !== '') {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser.userId!]: [...prevMessages[selectedUser.userId!], { text: newMessage }],
      }));
      socket.emit('userToUserMessage', {
        senderId: user?.id,
        receiverId: selectedUser.userId,
        message: { text: newMessage },
      });
    }
  };

  return (
    <div className="chat-container">
      <UserList
        users={employees.map(employee => ({ id: employee.userId!, name: employee.name! }))}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && selectedUser.userId && selectedUser.name && (
        <ChatBox
          selectedUser={{ id: selectedUser.userId, name: selectedUser.name }}
          messages={messages[selectedUser.userId] || []}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatContainerOwner;
