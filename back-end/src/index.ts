import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import employeeRoutes from './routes/employeeRoutes';
import { Server } from 'socket.io';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', 
    methods: ['*']
  }
});

io.on('connection', (socket) => {
  console.log('Socket connection ID: ', socket.id);

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User with ID ${userId} joined room ${userId}`);
  });

  socket.on('userToUserMessage', (data) => {
    console.log("Received data: ", data);
    const { senderId, receiverId, message, username } = data;
    io.to(receiverId).emit('userToUserMessage', { senderId, username, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
