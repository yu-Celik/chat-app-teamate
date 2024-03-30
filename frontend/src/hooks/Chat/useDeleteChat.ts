import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { handleError } from "./handleErrorFunc";

const useDeleteChat = () => {
    const { updateDeleteChat, chatInfo, updateUserChats, updateChatId } = useChat();

    const deleteChat = async (chatId: string) => {
        console.log('delete chat');
        updateDeleteChat(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.delete(`/chats/${chatId}`);
            const chat = response.data;
            if (chat) {
                updateDeleteChat(prevState => ({
                    ...prevState,
                    chat: chat
                }));
                // Créer une nouvelle liste de chats en retirant le chat supprimé
                const updatedUserChats = chatInfo.userChats.chats?.filter(chat => chat._id !== chatId);
                const secondUsers = chatInfo.userChats.secondUsers?.filter(user => user._id !== response.data.members[1]);
                updateUserChats(prevState => ({
                    ...prevState,
                    chats: updatedUserChats,
                    currentUser: chatInfo.userChats.currentUser,
                    secondUsers: secondUsers
                }));
                const storedOrder = localStorage.getItem('chatsOrder');
                if (storedOrder) {
                    let chatsOrder = JSON.parse(storedOrder);
                    chatsOrder = chatsOrder.filter((id: string) => id !== chatId);
                    localStorage.setItem('chatsOrder', JSON.stringify(chatsOrder));
                }
                if (chatInfo.chatId === chatId) {
                    updateChatId(null);
                }
            } else {
                throw new Error('Aucun chat trouvé.');
            }
        } catch (error) {
            handleError(error, updateDeleteChat);
        } finally {
            updateDeleteChat(prevState => ({
                ...prevState,
                isLoading: false
            }));
        }
    };

    return { deleteChat };
};

export default useDeleteChat;