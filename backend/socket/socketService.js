import { getReceiverSocketId, io } from './socket.js'; // Importez l'instance de io depuis votre fichier socket.js

export const notifyNewMessage = (receiverId, message) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', message);
    }
};

export const notifyEditMessage = (receiverId, message) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('editMessage', message);
    }
};

export const notifyDeleteMessage = (receiverId, message) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('deleteMessage', message);
    }
};

export const notifyNewChat = (receiverId, chat) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('newChat', chat);
    }
};  

export const notifyDeleteChat = (receiverId, chat) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('deleteChat', chat);
    }
};

export const notifyReadMessage = (receiverId, message) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('readMessage', message);
    }
};
