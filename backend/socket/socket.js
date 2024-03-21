/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

let onlineUsers = [];

io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);
    // écouté la connexion
    socket.on('addNewUser', (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        // console.log('onlineUsers', onlineUsers);
        io.emit('getOnlineUsers', onlineUsers);
    });

    // add new message
    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find((u) => u.userId === message.recipientId);
        if (user !== undefined) {
            io.to(user.socketId).emit('getMessage', message);
            io.to(user.socketId).emit('getNotification', {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    });

    // edit message
    socket.on('editMessage', (editedMessage) => {
        const { messageId, newText, recipientId } = editedMessage;
        const user = onlineUsers.find((u) => u.userId === recipientId);
        if (user !== undefined) {
            io.to(user.socketId).emit('messageEdited', { messageId, newText });
        }
    });

    // delete message
    socket.on('deleteMessage', (deletedMessage) => {
        const { messageId, recipientId } = deletedMessage;
        const user = onlineUsers.find((u) => u.userId === recipientId);
        if (user !== undefined) {
            io.to(user.socketId).emit('messageDeleted', messageId);
        }
    });

    // delete image url
    socket.on('deleteImageUrl', (deletedImageUrl) => {
        const { recipientId } = deletedImageUrl;
        const user = onlineUsers.find((u) => u.userId === recipientId);
        if (user !== undefined) {
            io.to(user.socketId).emit('imageUrlDeleted', deletedImageUrl);
        }
    });

    // disconnect
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });
});

export  {app, server, io};




// import { Server } from "socket.io";
// const activeUsers = {}; // Clé: chatId, Valeur: Set d'userId

// export default (server) => {
//     const io = new Server(server);

//     io.on('connection', (socket) => {
//         socket.on('joinChat', ({ userId, chatId }) => {
//             if (!activeUsers[chatId]) {
//                 activeUsers[chatId] = new Set();
//             }
//             activeUsers[chatId].add(userId);
//             console.log(`Utilisateur ${userId} a rejoint le chat ${chatId}`);
//         });

//         socket.on('leaveChat', ({ userId, chatId }) => {
//             activeUsers[chatId]?.delete(userId);
//             if (activeUsers[chatId]?.size === 0) {
//                 delete activeUsers[chatId];
//             }
//             console.log(`Utilisateur ${userId} a quitté le chat ${chatId}`);
//         });

//         socket.on('disconnect', () => {
//             // Gérer la déconnexion, potentiellement en parcourant activeUsers pour retirer cet utilisateur
//             console.log('Un utilisateur s\'est déconnecté');
//         });
//     });

//     return io;
// };