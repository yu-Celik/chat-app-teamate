import { getReceiverSocketIds, io } from './socket.js';

// Cette fonction émet un événement à tous les sockets associés à un userId donné
const emitToUser = (userId, event, data) => {
  const socketIds = getReceiverSocketIds(userId);
  socketIds.forEach(socketId => {
    io.to(socketId).emit(event, data);
  });
};

export const notifyNewMessage = (senderId, receiverId, message) => {
    // Émettre le message au récepteur
    emitToUser(receiverId, 'newMessage', message);

    // Émettre le message au sender (sur tous ses appareils)
    if (senderId !== receiverId) {
        emitToUser(senderId, 'newMessage', message);
    }
};

export const notifyEditMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'editMessage', message);

    if(senderId !== receiverId) {
        emitToUser(senderId, 'editMessage', message);
    }
};

export const notifyDeleteMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'deleteMessage', message);

    if(senderId !== receiverId) {
        emitToUser(senderId, 'deleteMessage', message);
    }
};

export const notifyNewChat = (senderId, receiverId, chat) => {
    emitToUser(receiverId, 'newChat', chat);

    if(senderId !== receiverId) {
        emitToUser(senderId, 'newChat', chat);
    }
};

export const notifyDeleteChat = (senderId, receiverId, chat) => {
    emitToUser(receiverId, 'deleteChat', chat);

    if(senderId !== receiverId) {
        emitToUser(senderId, 'deleteChat', chat);
    }
};

export const notifyReadMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'readMessage', message);

    if(senderId !== receiverId) {
        emitToUser(senderId, 'readMessage', message);
    }
};

export const notifyCreateUser = (user) => {
    // Émettre à tous les clients connectés
    io.emit('createUser', user);
};

