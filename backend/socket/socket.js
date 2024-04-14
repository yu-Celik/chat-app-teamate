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
    transports: ['websocket'],
});

export const getReceiverSocketIds = (receiverId) => {
    return userSocketMap[receiverId] || [];
}

export const getUserOpenConversations = (userId) => {
    return userOpenConversations[userId] || [];
}

export const getDisconnectedUsers = () => {
    return disconnectedUsers;
};

let onlineUsers = [];
let disconnectedUsers = [];
const userSocketMap = {}; // Clé: userId, Valeur: socketId
const userOpenConversations = {}; // Clé: userId, Valeur: chatId
io.on('connection', (socket) => {
    console.log('a user connected', socket.id, socket.handshake.query.userId);

    const userId = socket.handshake.query.userId;
    const dateNow = new Date(); // Date et heure actuelles
    if (userId) {
        if (!userSocketMap[userId]) { // Si l'utilisateur n'est pas dans la map
            userSocketMap[userId] = []; // Créer une liste vide pour l'utilisateur
        }
        userSocketMap[userId].push(socket.id); // Ajouter le socketId à la liste de sockets de l'utilisateur

        // Ajouter l'utilisateur à la liste des utilisateurs en ligne s'il n'est pas déjà présent
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id, connectedAt: dateNow }); // Ajouter l'utilisateur à la liste des utilisateurs en ligne
        }
        io.emit('getOnlineUsers', onlineUsers); // Émettre la liste des utilisateurs en ligne aux clients
    }

    socket.on('typing', ({ receiverId, chatId }) => {
        console.log('typing', receiverId, chatId);
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        if (receiverSocketIds.length > 0) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit('userTyping', { from: userId, chatId });
            });
        }
    });

    socket.on('stopTyping', ({ receiverId, chatId }) => {
        console.log('stopTyping', receiverId, chatId);
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        if (receiverSocketIds.length > 0) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit('stopTyping', { from: userId, chatId });
            });
        }
    });

    socket.on('conversationOpened', ({ chatId, receiverId }) => {
        // Assurez-vous que l'utilisateur a une entrée dans userOpenConversations
        if (!userOpenConversations[userId]) {
            userOpenConversations[userId] = [];
        }
    
        // Identifier les conversations à fermer
        const conversationsToClose = userOpenConversations[userId].filter(openChatId => openChatId !== chatId);
    
        // Fermer les conversations identifiées
        conversationsToClose.forEach(openChatId => {
            const index = userOpenConversations[userId].indexOf(openChatId);
            if (index !== -1) {
                // Émettre un événement pour indiquer que la conversation précédente a été fermée
                io.to(socket.id).emit('conversationClosed', { chatId: openChatId });
            }
        });
    
        // Mettre à jour userOpenConversations[userId] pour ne contenir que la nouvelle conversation ouverte
        userOpenConversations[userId] = userOpenConversations[userId].filter(chat => chat === chatId || !conversationsToClose.includes(chat));
    
        // Ajouter la nouvelle conversation si elle n'est pas déjà présente
        if (!userOpenConversations[userId].includes(chatId)) {
            userOpenConversations[userId].push(chatId);
        }
    
        console.log('conversationOpened', userId, chatId);
        // Émettre l'ouverture de la nouvelle conversation aux clients
        io.to(socket.id).emit('conversationOpened', { from: userId, chatId });
    });
    
    socket.on('conversationClosed', ({ chatId }) => {
        if (userOpenConversations[userId] && userOpenConversations[userId].includes(chatId)) {
            const index = userOpenConversations[userId].indexOf(chatId);
            if (index !== -1) {
                userOpenConversations[userId].splice(index, 1);
                console.log('conversationClosed', userId, chatId);
            }
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


export async function handleUserDisconnect(userId, socketId) {
    // Supprimer le socketId de userSocketMap pour l'utilisateur
    const userSockets = userSocketMap[userId];
    if (userSockets) {
        const index = userSockets.indexOf(socketId);
        if (index !== -1) {
            userSockets.splice(index, 1);
        }
        if (userSockets.length === 0) {
            delete userSocketMap[userId];
            // Puisque l'utilisateur n'a plus de sockets actifs, retirez-le de la liste des utilisateurs en ligne
            onlineUsers = onlineUsers.filter(user => user.userId !== userId);
        }
    } else {
        // Si pour une raison quelconque, l'utilisateur n'est pas dans userSocketMap, assurez-vous qu'il est également retiré de onlineUsers
        onlineUsers = onlineUsers.filter(user => user.userId !== userId);
    }

    // Mettre à jour les listes d'utilisateurs déconnectés
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
