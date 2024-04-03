/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://chat-app-teamate.onrender.com", "http://localhost:5000", "http://192.168.1.103:3000"],
        credentials: true,
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

let onlineUsers = [];
const userSocketMap = {}; // Clé: userId, Valeur: socketId
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        // Ajouter l'utilisateur à la liste des utilisateurs en ligne s'il n'est pas déjà présent
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
            // Émettre la liste mise à jour des utilisateurs en ligne à tous les clients
            io.emit('getOnlineUsers', onlineUsers);
        }
    }

    socket.on('typing', ({ receiverId }) => {
        console.log('typing', receiverId);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('userTyping', { from: socket.handshake.query.userId });
        }
    });

    socket.on('stopTyping', ({ receiverId }) => {
        console.log('stopTyping', receiverId);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('stopTyping', { from: socket.handshake.query.userId });
        }
    });

    // disconnect
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });
});

export  {app, server, io};