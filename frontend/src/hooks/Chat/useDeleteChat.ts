import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";

const useDeleteChat = () => {
    const { updateDeleteChat, chatInfo, updateUserChats } = useChat();

    const deleteChat = async (chatId: string) => {
        console.log('delete chat');
        updateDeleteChat({ isLoading: true, error: null });
        try {
            const response = await axios.delete (`/chats/${chatId}`);
            updateDeleteChat({ isLoading: false, error: null, chat: response.data });

            // Créer une nouvelle liste de chats en retirant le chat supprimé
            const updatedUserChats = chatInfo.userChats.chats?.filter(chat => chat._id !== chatId);
            const secondUsers = chatInfo.userChats.secondUsers?.filter(user => user._id !== response.data.members[1]);
            
            updateUserChats({ 
                ...chatInfo.userChats,
                chats: updatedUserChats,
                isLoading: false,
                error: null,
                currentUser: chatInfo.userChats.currentUser,
                secondUsers: secondUsers
            });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                updateDeleteChat({ chat: null, isLoading: false, error: error.message });
            }
            console.error(error);
        }
    };

    return { deleteChat };
};

export default useDeleteChat;