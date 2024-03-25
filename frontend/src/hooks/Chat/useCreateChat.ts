import { useState } from "react";
import axios from "../../config/axiosConfig";
import { ChatState } from "../../types/Chat.type/Chat.Props";

const useCreateChat = () => {
    const [newChat, setNewChat] = useState<ChatState>({
        data: null,
        isLoading: false,
        error: null,
    });

    const createChat = async (secondUserId: string) => {
        setNewChat({ ...newChat, isLoading: true });
        try {
            const response = await axios.post('/chats', { secondId: secondUserId });
            console.log('create chat', response.data);
            setNewChat({ data: response.data, isLoading: false, error: null });
            return response.data; // Retourne les données du chat créé
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setNewChat({ ...newChat, error: error.message, isLoading: false });
            }
            console.log(error);
            return null; // Retourne null en cas d'erreur
        }
    };

    return { createChat, newChat };
};

export default useCreateChat;