import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import UserModel from '../Models/user.model.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // origin: ["https://chat-app-teamate.onrender.com"], // Pour le site chat-app-teamate.onrender.com
        origin: ["http://192.168.1.150:3000"], // En local
        credentials: true,
    },
});

export const getReceiverSocketIds = (receiverId) => {
    return userSocketMap[receiverId] || [];
}

export const getDisconnectedUsers = () => {
    return disconnectedUsers;
};

let onlineUsers = [];
let disconnectedUsers = [];
const userSocketMap = {}; // Clé: userId, Valeur: socketId
io.on('connection', (socket) => {
    console.log('a user connected', socket.id, socket.handshake.query.userId);

    const userId = socket.handshake.query.userId;
    const dateNow = new Date(); // Date et heure actuelles
    if (userId) {
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = [];
        }
        userSocketMap[userId].push(socket.id);

        // Ajouter l'utilisateur à la liste des utilisateurs en ligne s'il n'est pas déjà présent
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id, connectedAt: dateNow });
        }
        io.emit('getOnlineUsers', onlineUsers);
    }

    socket.on('typing', ({ receiverId, chatId }) => {
        console.log('typing', receiverId, chatId);
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        if (receiverSocketIds.length > 0) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit('userTyping', { from: socket.handshake.query.userId, chatId: chatId });
            });
        }
    });

    socket.on('stopTyping', ({ receiverId, chatId }) => {
        console.log('stopTyping', receiverId, chatId);
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        if (receiverSocketIds.length > 0) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit('stopTyping', { from: socket.handshake.query.userId, chatId: chatId });
            });
        }
    });

    // disconnect
    socket.on('disconnect', async () => {
        const userId = socket.handshake.query.userId;
        if (!userId) return;

        try {
            await handleUserDisconnect(userId, socket.id);
            console.log(`Last logout updated for user ${userId}`);
        } catch (error) {
            console.error('Error handling user disconnect:', error);
        }
    });

    
});


async function handleUserDisconnect(userId, socketId) {
    // Supprimer le socketId de userSocketMap pour l'utilisateur
    const userSockets = userSocketMap[userId];
    if (userSockets) {
        userSocketMap[userId] = userSockets.filter(id => id !== socketId);
        if (userSocketMap[userId].length === 0) {
            delete userSocketMap[userId];
        }
    }

    // Mettre à jour les listes d'utilisateurs en ligne et déconnectés
    onlineUsers = onlineUsers.filter(user => user.userId !== userId);
    const dateNow = new Date();
    const userIndex = disconnectedUsers.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        disconnectedUsers[userIndex].disconnectedAt = dateNow;
    } else {
        disconnectedUsers.push({ userId, disconnectedAt: dateNow });
    }

    // Mettre à jour la base de données avec le dernier moment de déconnexion
    await UserModel.findByIdAndUpdate(userId, { lastLogout: dateNow });

    // Émettre les mises à jour aux clients
    io.emit('getOnlineUsers', onlineUsers);
    io.emit('getDisconnectedUsers', disconnectedUsers);
}
export { app, server, io };