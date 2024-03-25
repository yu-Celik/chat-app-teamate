import { useCallback, useState } from "react";
import axios from "../../config/axiosConfig";

const useCreateChat = ({ refreshChats }: { refreshChats: () => void }) => {
    const [isCreatingChat, setIsCreatingChat] = useState(false);

    const createChat = useCallback(async (secondUserId: string) => {
        setIsCreatingChat(true);
        try {
            const response = await axios.post('/chats', {
                secondId: secondUserId,
            });
            console.log(response.data);
            refreshChats(); // Rafraîchissez la liste des chats après la création réussie
        } catch (error) {
            console.log(error);
        } finally {
            setIsCreatingChat(false);
        }
    }, [refreshChats]);

    return { createChat, isCreatingChat };
};

export default useCreateChat;