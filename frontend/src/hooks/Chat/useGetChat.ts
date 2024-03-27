import { useCallback, useState } from "react";
import { ChatState } from "../../types/Chat.type/Chat.Props"; // Assurez-vous que ChatState correspond à la structure de l'objet de chat attendu
import axios from "../../config/axiosConfig";

const useGetChat = () => {
    const [chat, setChat] = useState<ChatState>({
        isLoading: false,
        data: null, // Ajustez pour stocker un seul objet de chat
        error: null
    });

    const getChat = useCallback(async (chatId: string) => {
        setChat({
            isLoading: true,
            data: null,
            error: null
        });
        try {
            const response = await axios.get(`/chats/${chatId}`);
            setChat({
                isLoading: false,
                data: response.data, // Stockez l'objet de chat reçu
                error: null
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setChat({
                    isLoading: false,
                    data: null,
                    error: error.message
                });
            }
        }
    }, []);

    return { chat, getChat };
};

export default useGetChat;