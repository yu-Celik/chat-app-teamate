import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useCallback } from 'react';

const useGetMessages = () => {
    const { updateMessages } = useChat()

    const getMessages = useCallback(async (chatId: string) => {
        console.log('getMessages');
        updateMessages({
            isLoading: true,
            messagesList: [],
            error: null
        });
        try {
            const response = await axios.get(`/messages/${chatId}`);
            updateMessages({
                isLoading: false,
                messagesList: response.data,
                error: null
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                updateMessages({
                    isLoading: false,
                    messagesList: [],
                    error: error.message
                });
            }
        }
    }, [updateMessages]); // Ajoutez ici toutes les dépendances nécessaires

    return { getMessages }
}

export default useGetMessages;