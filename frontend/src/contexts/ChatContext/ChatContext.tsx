import React, { createContext, useCallback, useState, useEffect } from 'react';
import { ChatContextProps, ChatInfo, UpdateChatId, UpdateCreateChat, UpdateDeleteChat, UpdateMessages, UpdatePotentialChats, UpdateUserChats, UpdateAllUsers, UpdateSendMessageStatus, UpdateMessageInList, DeleteMessageFromList, UpdateDeleteMessage, UpdateChatOrder, UpdateLastMessageSeen, AddNewMessage, updateTypingState } from '../../types/Chat.type/ChatContext.Props';
import { CurrentUser, User } from '../../types/Auth.type/Auth.Props';
import { useSocket } from '../Socket/useSocketContext';
import { Message } from '../../types/Chat.type/Chat.Props';

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider = ({ children, currentUser }: { children: React.ReactNode, currentUser: CurrentUser }) => {
    const { onlineUsers, disconnectedUsers } = useSocket()

    // Remplisage de chatInfo par allUsers en 1er
    // Remplisage de chatInfo par userChats en 2e
    // Remplisage de chatInfo par potentialChats en envoyant tous les users de allUsers 
    // Remplisage de chatInfo par potientialChats lorsqu'il reçois les valeurs de userChats puis trie les users qui n'ont pas été ajoutés dans userChats

    const [chatInfo, setChatInfo] = useState<ChatInfo>({
        chatId: null,
        createChat: {
            isLoading: false,
            error: null,
            chat: null
        },
        deleteChat: {
            isLoading: false,
            error: null,
            chat: null
        },
        userChats: {
            isLoading: false,
            error: null,
            chats: [],
            currentUser: {} as User,
            secondUsers: [],
            onlineUsers: []
        },
        allUsers: {
            isLoading: false,
            error: null,
            users: []
        },
        messages: {
            isLoading: false,
            error: null,
            messagesList: []
        },
        deleteMessage: {
            isLoading: false,
            error: null,
            message: null
        },
        sendMessageStatus: {
            isLoading: false,
            error: null,
            warning: null,
            isEditing: false,
            editId: null,
            messageToEdit: null,
            firstMessageSend: false
        },
        potentialChats: [],
        lastMessageSeen: {
            isLoading: false,
            error: null,
            messages: []
        },
        onlineUsersIds: [],
        disconnectedUsersIds: [],
        typingState: { isTyping: false, userId: null },
    });
    useEffect(() => {
        setChatInfo(prev => ({
            ...prev,
            userChats: {
                ...prev.userChats,
                currentUser: currentUser.data as User,
            },
        }));
    }, [currentUser.data]);

    const updateAllUsers: UpdateAllUsers = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            allUsers: updateFunction(prev.allUsers)
        }));
    }, []);

    const updateUserChats: UpdateUserChats = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            userChats: updateFunction(prev.userChats)
        }));
    }, []);

    const updateCreateChat: UpdateCreateChat = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            createChat: updateFunction(prev.createChat)
        }));
    }, []);

    const updateDeleteChat: UpdateDeleteChat = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            deleteChat: updateFunction(prev.deleteChat)
        }));
    }, []);

    const updatePotentialChats: UpdatePotentialChats = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            potentialChats: updateFunction(prev.potentialChats)
        }));
    }, []);

    const updateMessages: UpdateMessages = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            messages: updateFunction(prev.messages)
        }));
    }, []);
    const updateChatId: UpdateChatId = useCallback((chatId) => {
        setChatInfo(prev => {
            const newChatId = chatId;
            if (prev.chatId === newChatId) {
                return prev;
            }
            return { ...prev, chatId: newChatId };
        });
    }, []);

    const updateSendMessageStatus: UpdateSendMessageStatus = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            sendMessageStatus: updateFunction(prev.sendMessageStatus)
        }));
    }, []);

    const updateMessageInList: UpdateMessageInList = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            messages: {
                ...prev.messages,
                messagesList: updateFunction(prev.messages.messagesList),
            },
        }));
    }, []);

    const addNewMessage: AddNewMessage = useCallback((newMessage: Message) => {
        setChatInfo(prev => ({
            ...prev,
            messages: {
                ...prev.messages,
                messagesList: [...prev.messages.messagesList, newMessage]
            }
        }));
    }, []);

    const deleteMessageFromList: DeleteMessageFromList = useCallback((messageId) => {
        setChatInfo(prev => ({
            ...prev,
            messages: {
                ...prev.messages,
                messagesList: prev.messages.messagesList.filter(message => message._id !== messageId),
            },
        }));
    }, []);

    const updateDeleteMessage: UpdateDeleteMessage = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            deleteMessage: updateFunction(prev.deleteMessage)
        }));
    }, []);

    const updateLastMessageSeen: UpdateLastMessageSeen = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            lastMessageSeen: updateFunction(prev.lastMessageSeen)
        }));
    }, []);

    const updateTypingState: updateTypingState = useCallback((updateFunction) => {
        setChatInfo(prev => ({
            ...prev,
            typingState: updateFunction(prev.typingState)
        }));
    }, []);

    const updateChatOrder: UpdateChatOrder = useCallback((newChatsArray) => {
        setChatInfo(prev => ({
            ...prev,
            userChats: {
                ...prev.userChats,
                chats: newChatsArray,
            },
        }));
    }, []);




    
    useEffect(() => { // Mise à jour de potentialChats basée sur allUsers et userChats
        updatePotentialChats(prevState => {
            const newPotentialChats = chatInfo.allUsers.users?.filter(user =>
                !chatInfo.userChats.chats?.some(chat =>
                    chat.members.some(member => member._id === user._id)
                )
            );
            // Retourne les nouveaux chats potentiels ou l'état précédent si aucun changement
            return newPotentialChats ?? prevState;
        });
    }, [chatInfo.allUsers.users, chatInfo.userChats.chats, updatePotentialChats]);


    useEffect(() => { // Mettre à jour onlineUsersIds
        // Mettre à jour onlineUsersIds chaque fois que onlineUsers change
        const ids = onlineUsers.map(user => user.userId);
        setChatInfo(prev => ({
            ...prev,
            onlineUsersIds: ids
        }));
    }, [onlineUsers]);

    useEffect(() => { // Mettre à jour disconnectedUsersIds
        const updatedDisconnectedUsersIds = disconnectedUsers.map(user => ({
            userId: user.userId,
            disconnectedAt: user.disconnectedAt // Assurez-vous que cette propriété existe sur vos objets user
        }));
    
        setChatInfo(prev => ({
            ...prev,
            disconnectedUsersIds: updatedDisconnectedUsersIds
        }));
    }, [disconnectedUsers]);


    useEffect(() => { // Mettre à jour lastMessageSeen
        // Set est utilisé pour éviter les doublons dans les ids
        const idsChats = new Set(chatInfo.userChats.chats.map(chat => chat._id));
        // has est utilisé pour vérifier si l'id existe dans le Set
        const lastMessageOfChat = chatInfo.lastMessageSeen.messages.filter(message => idsChats.has(message.chatId));
        updateLastMessageSeen(prevState => ({
            ...prevState,
            messages: lastMessageOfChat
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatInfo.userChats.chats, updateLastMessageSeen]); // Retirer chatInfo.lastMessageSeen.messages des dépendances

    useEffect(() => {
        // console.log('chatInfo', chatInfo);
    }, [chatInfo]);

    return (
        <ChatContext.Provider value={{ chatInfo, currentUser, updateAllUsers, updateUserChats, updateCreateChat, updateDeleteChat, updatePotentialChats, updateMessages, updateChatId, updateSendMessageStatus, updateMessageInList, deleteMessageFromList, updateDeleteMessage, updateChatOrder, updateLastMessageSeen, addNewMessage, updateTypingState }}>
            {children}
        </ChatContext.Provider>
    );
};