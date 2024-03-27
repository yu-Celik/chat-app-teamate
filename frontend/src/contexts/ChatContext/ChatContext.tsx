import React, { createContext, useCallback, useState, useEffect } from 'react';
import { ChatContextProps, ChatInfo, UpdateChatId, UpdateCreateChat, UpdateDeleteChat, UpdateMessages, UpdatePotentialChats, UpdateUserChats, UpdateAllUsers } from '../../types/Chat.type/ChatContext.Props';
import { ChatState, MessagesState, UserChats } from '../../types/Chat.type/Chat.Props';
import { User } from '../../types/Auth.type/Auth.Props';

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

    // Remplisage de chatInfo par allUsers en 1er
    // Remplisage de chatInfo par userChats en 2e
    // Remplisage de chatInfo par potentialChats en envoyant tous les users de allUsers 
    // Remplisage de chatInfo par potientialChats lorsqu'il reçois les valeurs de userChats puis trie les users qui n'ont pas été ajoutés dans userChats

    const [chatInfo, setChatInfo] = useState<ChatInfo>({
        chatId: null,
        chatName: null,
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
        potentialChats: [],
        lastLogin: null,
        profilePic: null
    });

    // Mise à jour des états spécifiques
    const updateAllUsers: UpdateAllUsers = useCallback((allUsers) => {
        setChatInfo(prev => ({ ...prev, allUsers}));
    }, []);

    const updateUserChats: UpdateUserChats = useCallback((userChats: UserChats) => {
        setChatInfo(prev => ({ ...prev, userChats }));
    }, []);

    const updateCreateChat: UpdateCreateChat = useCallback((createChat: ChatState) => {
        setChatInfo(prev => ({ ...prev, createChat }));
    }, []);

    const updateDeleteChat: UpdateDeleteChat = useCallback((deleteChat: ChatState) => {
        setChatInfo(prev => ({ ...prev, deleteChat }));
    }, []);

    const updatePotentialChats: UpdatePotentialChats = useCallback((potentialChats: User[]) => {
        setChatInfo(prev => ({ ...prev, potentialChats }));
    }, []);

    const updateMessages: UpdateMessages = useCallback((messages: MessagesState) => {
        setChatInfo(prev => ({ ...prev, messages }));
    }, []);

    const updateChatId: UpdateChatId = useCallback((newChatId: string) => {
        setChatInfo(prev => {
            if (prev.chatId === newChatId) {
                // Pas de changement, pas besoin de mettre à jour l'état
                return prev;
            }
            // Mise à jour de l'état avec le nouveau chatId
            return { ...prev, chatId: newChatId };
        });
    }, []);

    // Mise à jour de potentialChats basée sur allUsers et userChats
    useEffect(() => {
        const newPotentialChats = chatInfo.allUsers.users?.filter(user =>
            !chatInfo.userChats.chats?.some(chat =>
                chat.members.some(member => member._id === user._id)
            )
        );
        updatePotentialChats(newPotentialChats ?? []);
    }, [chatInfo.allUsers, chatInfo.userChats, updatePotentialChats]);

    useEffect(() => {
        console.log('chatId', chatInfo.chatId);
    }, [chatInfo.chatId]);

    return (
        <ChatContext.Provider value={{ chatInfo, updateAllUsers, updateUserChats, updateCreateChat, updateDeleteChat, updatePotentialChats, updateMessages, updateChatId }}>
            {children}
        </ChatContext.Provider>
    );
};