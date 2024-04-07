import { getReceiverSocketIds, io } from './socket.js';

export const notifyNewMessage = (receiverId, message) => {
    const receiverSocketIds = getReceiverSocketIds(receiverId);
    console.log('receiverId', receiverId);
    receiverSocketIds.forEach(socketId => {
        console.log('receiverSocketIdsMessage', receiverSocketIds);
        io.to(socketId).emit('newMessage', message);
    });
};

export const notifyEditMessage = (receiverId, message) => {
    const receiverSocketIds = getReceiverSocketIds(receiverId);
    receiverSocketIds.forEach(socketId => {
        io.to(socketId).emit('editMessage', message);
    });
};

export const notifyDeleteMessage = (receiverId, message) => {
    const receiverSocketIds = getReceiverSocketIds(receiverId);
    receiverSocketIds.forEach(socketId => {
        io.to(socketId).emit('deleteMessage', message);
    });
};

export const notifyNewChat = (receiverId, chat) => {
    const receiverSocketIds = getReceiverSocketIds(receiverId);
    receiverSocketIds.forEach(socketId => {
        io.to(socketId).emit('newChat', chat);
    });
};

export const notifyDeleteChat = (receiverId, chat) => {
    const receiverSocketIds = getReceiverSocketIds(receiverId);
    receiverSocketIds.forEach(socketId => {
        io.to(socketId).emit('deleteChat', chat);
    });
};

export const notifyReadMessage = (receiverId, message) => {
    const receiverSocketIds = getReceiverSocketIds(receiverId);
    receiverSocketIds.forEach(socketId => {
        io.to(socketId).emit('readMessage', message);
    });
};

export const notifyCreateUser = (user) => {
    // Émettre à tous les clients connectés
    io.emit('createUser', user);
};

