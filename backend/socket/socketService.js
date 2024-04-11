import { getReceiverSocketIds, getUserOpenConversations, io } from './socket.js';
import MessageModel from '../Models/message.model.js';

// Cette fonction émet un événement à tous les sockets associés à un userId donné
const emitToUser = (userId, event, data) => {
    const socketIds = getReceiverSocketIds(userId);
    socketIds.forEach(socketId => {
        io.to(socketId).emit(event, data);
    });
};

export const notifyNewMessage = async (senderId, receiverId, message) => {
    emitToUser(receiverId, 'newMessage', message);
    const openConversations = getUserOpenConversations(receiverId); // Récupérer les conversations ouvertes par le receiver
    console.log('openConversations', openConversations);
    if (openConversations.map(String).includes(String(message.chatId))) { // Vérifiez si le chatId du message est dans les conversations ouvertes
        console.log('notifyNewMessage');
        emitToUser(receiverId, 'messagesAsRead', message);
        emitToUser(senderId, 'messagesAsRead', message);
        await MessageModel.findOneAndUpdate(
            { _id: message._id },
            { read: true, readAt: new Date() }
        );
    }

    if (senderId !== receiverId) {
        emitToUser(senderId, 'newMessage', message);
    }
};

export const notifyEditMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'editMessage', message);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'editMessage', message);
    }
};

export const notifyDeleteMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'deleteMessage', message);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'deleteMessage', message);
    }
};

export const notifyNewChat = (senderId, receiverId, chat) => {
    emitToUser(receiverId, 'newChat', chat);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'newChat', chat);
    }
};

export const notifyDeleteChat = (senderId, receiverId, chat) => {
    emitToUser(receiverId, 'deleteChat', chat);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'deleteChat', chat);
    }
};

export const notifyMarkAllMessagesAsRead = (senderId, receiverId, messages) => {
    // console.log(`Émission de 'messagesAsRead' à receiverId: ${receiverId} et senderId: ${senderId}`);
    emitToUser(receiverId, 'messagesAsRead', messages);
    console.log('messages', messages);
    if (senderId !== receiverId) {
        emitToUser(senderId, 'messagesAsRead', messages);
    }
};

export const notifyCreateUser = (user) => {
    // Émettre à tous les clients connectés
    io.emit('createUser', user);
};