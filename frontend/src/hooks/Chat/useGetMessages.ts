import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useCallback } from 'react';
import { handleError } from "./handleErrorFunc";

const useGetMessages = () => {
    const { updateMessages } = useChat()

    const getMessages = useCallback(async (chatId: string) => {
        console.log('getMessages');
        updateMessages(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.get(`/messages/${chatId}`);
            const messagesList = response.data;
            if (messagesList) {
                updateMessages(prevState => ({ ...prevState, messagesList: messagesList }));
            } else {
                throw new Error("Aucun message trouvé");
            }
        } catch (error) {
            handleError(error, updateMessages);
        } finally {
            updateMessages(prevState => ({ ...prevState, isLoading: false }));
        }
    }, [updateMessages]); // Ajoutez ici toutes les dépendances nécessaires

    return { getMessages }
}

export default useGetMessages;