import React, { createContext, useCallback, useState, useEffect } from 'react';
import { ChatContextProps, ChatInfo, UpdateChatId, UpdateCreateChat, UpdateDeleteChat, UpdateMessages, UpdatePotentialChats, UpdateUserChats, UpdateAllUsers, UpdateSendMessageStatus, UpdateMessageInList, DeleteMessageFromList, UpdateDeleteMessage, UpdateChatOrder } from '../../types/Chat.type/ChatContext.Props';

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

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
            currentUser: {},
            secondUsers: []
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
            isTyping: false,
            isEditing: false,
            editId: null,
            messageToEdit: null
        },
        potentialChats: [],
    });

    // Mise à jour des états spécifiques
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
                // Pas de changement, pas besoin de mettre à jour l'état
                return prev;
            }
            // Mise à jour de l'état avec le nouveau chatId
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

    const updateChatOrder: UpdateChatOrder = useCallback((newChatsArray) => {
        setChatInfo(prev => ({
            ...prev,
            userChats: {
                ...prev.userChats,
                chats: newChatsArray,
            },
        }));
    }, []);

    // Mise à jour de potentialChats basée sur allUsers et userChats
    useEffect(() => {
        updatePotentialChats(prevState => {
            const newPotentialChats = chatInfo.allUsers.users?.filter(user =>
                !chatInfo.userChats.chats?.some(chat =>
                    chat.members.some(member => member._id === user._id)
                )
            );
            // Retourne les nouveaux chats potentiels ou l'état précédent si aucun changement
            return newPotentialChats ?? prevState;
        });
    }, [chatInfo.allUsers, chatInfo.userChats, updatePotentialChats]);

    
    useEffect(() => {
        // console.log('chatInfo', chatInfo.userChats.chats);
    }, [chatInfo]);

    return (
        <ChatContext.Provider value={{ chatInfo, updateAllUsers, updateUserChats, updateCreateChat, updateDeleteChat, updatePotentialChats, updateMessages, updateChatId, updateSendMessageStatus, updateMessageInList, deleteMessageFromList, updateDeleteMessage, updateChatOrder }}>
            {children}
        </ChatContext.Provider>
    );
};