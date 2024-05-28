import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import employeeRoutes from './routes/employeeRoutes';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['*'] // Allow all methods
  }
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Join room with user ID
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User with ID ${userId} joined room ${userId}`);
  });

  // Listen for messages from User to User based on their IDs
  socket.on('userToUserMessage', (data) => {
    console.log("Received data: ", data);
    const { senderId, receiverId, message } = data;
    // Send message to the specified receiver
    io.to(receiverId).emit('userToUserMessage', { senderId, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
