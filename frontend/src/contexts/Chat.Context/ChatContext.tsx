import { ReactNode, createContext, useEffect, useState } from "react";
import { Chat, ChatContextProps } from "../../types/Chat.Context/Chat.Context";
import axios from '../../config/axiosConfig';
import { User } from "../../types/Auth.Context.type/Auth.Context.Props";

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);



export const ChatContextProvider = ({ children, currentUser }: { children: ReactNode, currentUser: User }) => {
    const [userChats, setUserChats] = useState<Chat[]>([]); // Find all chats of a user
    const [isFindingUserChatsLoading, setIsFindingUserChatsLoading] = useState(false);

    const [fetchingUsers, setFetchingUsers] = useState<User[]>([]); // Get all users except the logged in user
    const [isFetchingUsersLoading, setIsFetchingUsersLoading] = useState(false);






    useEffect(() => {
        if (currentUser) {
            const getAllUsersExceptLoggedIn = async () => {
                setIsFetchingUsersLoading(true);
                try {
                    const response = await axios.get('/users')
                    setFetchingUsers(response.data);
                    setIsFetchingUsersLoading(false);
                } catch (error) {
                    console.error('Erreur lors de la récupération des utilisateurs:', error);
                } finally {
                    setIsFetchingUsersLoading(false);
                    // Code à exécuter après le bloc try/catch, même en cas d'erreur
                }
            };
            getAllUsersExceptLoggedIn();
        }
    }, [currentUser]);


    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                setIsFindingUserChatsLoading(true);
                try {
                    const response = await axios.get('/chats/findUserChats')
                    setUserChats(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des chats:', error);
                } finally {
                    setIsFindingUserChatsLoading(false);
                }
            }
            fetchData();
        }
    }, [currentUser]);

    return (
        <ChatContext.Provider value={{ userChats, fetchingUsers, isFetchingUsersLoading, isFindingUserChatsLoading }}>
            {children}
        </ChatContext.Provider>
    );
}

