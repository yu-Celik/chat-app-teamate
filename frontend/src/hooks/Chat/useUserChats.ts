import { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { Chat } from "../../types/Chat.type/Chat.Props";

const useUserChats = () => {
    const { updateUserChats } = useChat();



    useEffect(() => {
        const fetchUserChats = async () => {
            console.log('fetchUserChats');
            updateUserChats({ chats: [], currentUser: {}, secondUsers: [], isLoading: true, error: null });

            try {
                const response = await axios.get('/chats/findUserChats');
                // Mise à jour de l'état avec les chats récupérés
                updateUserChats({
                    chats: response.data,
                    currentUser: response.data[0].members[0],
                    secondUsers: response.data.map((chat: Chat) => chat.members[1]),
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des chats:', error);
                if (axios.isAxiosError(error)) {
                    updateUserChats({ chats: [], currentUser: {}, secondUsers: [], isLoading: false, error: error.message });
                }

            }
        };
        fetchUserChats();
    }, [updateUserChats]);

};

export default useUserChats;