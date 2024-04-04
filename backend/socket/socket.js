/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import UserModel from '../Models/user.model.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://chat-app-teamate.onrender.com"], // Pour le site chat-app-teamate.onrender.com
        // origin: ["http://192.168.1.103:3000"], // En local
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

    socket.on('typing', ({ receiverId, chatId }) => { // Ajoutez chatId ici
        console.log('typing', receiverId, chatId);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('userTyping', { from: socket.handshake.query.userId, chatId: chatId });
        }
    });

    socket.on('stopTyping', ({ receiverId, chatId }) => { // Ajoutez chatId ici
        console.log('stopTyping', receiverId, chatId);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('stopTyping', { from: socket.handshake.query.userId, chatId: chatId });
        }
    });

    // disconnect
    socket.on('disconnect', async() => {
        const user = onlineUsers.find((user) => user.socketId === socket.id);
        if (user) {
            try {
                // Mettre à jour le champ lastLogout pour cet utilisateur
                await UserModel.findByIdAndUpdate(user.userId, { lastLogout: new Date() });
                console.log(`Last logout updated for user ${user.userId}`);
            } catch (error) {
                console.error('Error updating lastLogout', error);
            }
            io.emit('userDisconnected', { userId: user.userId, lastLogout: new Date() });    
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            io.emit('getOnlineUsers', onlineUsers);
        }
    });
});

export { app, server, io };