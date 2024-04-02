import { useChat } from "../../contexts/ChatContext/useChatContext"
import { handleError } from "./handleErrorFunc";
import axios from "../../config/axiosConfig";
import { useEffect } from "react";

const useGetLastMessageSeen = () => {
    const { updateLastMessageSeen } = useChat();

    useEffect(() => {
        const getLastMessageSeen = async () => {
            updateLastMessageSeen(prev => ({
                ...prev,
                isLoading: true
            }));
            try {
                const response = await axios.get('/messages/getLastMessageSeen');
                if (response.status === 200) {
                    updateLastMessageSeen(prev => ({
                        ...prev,
                        messages: response.data
                    }));
                } else {
                    updateLastMessageSeen(prev => ({
                        ...prev,
                        error: 'Erreur lors de la récupération du dernier message vu'
                    }));
                    throw new Error('Erreur lors de la récupération du dernier message vu');
                }

            } catch (error) {
                handleError(error, updateLastMessageSeen);
            } finally {
                updateLastMessageSeen(prev => ({
                    ...prev,
                    isLoading: false
                }));
            }
        }
        getLastMessageSeen();
    }, [updateLastMessageSeen])

}

export default useGetLastMessageSeen;
