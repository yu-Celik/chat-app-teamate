import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";

const useCreateChat = () => {
    const { updateCreateChat, chatInfo, updateUserChats, updateChatId } = useChat();

    const createChat = async (secondUserId: string) => {
        console.log('createChat');
        updateCreateChat({ chat: null, isLoading: true, error: null });
        try {
            const response = await axios.post('/chats', { secondUserId });
            if (response.data && response.data._id) { // Assurez-vous que la réponse correspond au type Chat
                updateCreateChat({ chat: response.data, isLoading: false, error: null });

                // Créer une nouvelle liste de chats en ajoutant le nouveau chat
                const newUserChats = [...(chatInfo.userChats.chats || []), response.data];
                const secondUsers = [...(chatInfo.userChats.secondUsers || []), response.data.members[1]];

                updateUserChats({
                    ...chatInfo.userChats,
                    chats: newUserChats,
                    isLoading: false, 
                    error: null,
                    currentUser: response.data.members[0],
                    secondUsers: secondUsers
                });
                updateChatId(response.data._id);
            } else {
                throw new Error("Invalid chat data");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                updateCreateChat({ chat: null, isLoading: false, error: error.message });
            }
            console.error(error);
        }
    };

    return { createChat };
};

export default useCreateChat;

