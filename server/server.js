import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import poemRoutes from './routes/poemRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import diagnoseRoutes from './routes/diagnoseRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import helperRoutes from './routes/helperRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.IO Setup (Fixed Config)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  // Removed connectionStateRecovery (causes issues with manual reconnects)
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Log CORS origin
console.log('CORS allowed origin:', process.env.CLIENT_URL || 'http://localhost:5173');

// Socket.IO Events (Fixed Handlers)
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // User-specific notification room
  socket.on('joinUserRoom', (userId) => {
    if (userId) {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined room: user-${userId}`);
    }
  });

  // Chat room join (Flexible payload handling)
  socket.on('joinChat', (data) => {
    const chatId = data.chatId || data; // Supports both { chatId } and raw string
    if (chatId) {
      socket.join(`chat-${chatId}`);
      console.log(`Socket ${socket.id} joined chat room: chat-${chatId}`);
    }
  });

  // Chat message broadcast (Fixed: uses io.to() to include sender)
  socket.on('sendMessage', ({ chatId, message }) => {
    if (chatId && message) {
      io.to(`chat-${chatId}`).emit('newMessage', { chatId, message }); // Broadcast to ALL in room
      console.log(`Message broadcasted to chat-${chatId}:`, message);
    }
  });

  // Error and disconnect handlers
  socket.on('disconnect', (reason) => {
    console.log(`Socket disconnected (${socket.id}): ${reason}`);
  });

  socket.on('error', (err) => {
    console.error(`Socket error (${socket.id}):`, err);
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/diagnose', diagnoseRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/helpers', helperRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);

// MongoDB Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));

export { io };