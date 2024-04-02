import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { User } from "../../types/Auth.type/Auth.Props";
import { handleError } from "./handleErrorFunc";

const useDeleteChat = () => {
    const { updateDeleteChat, chatInfo, updateUserChats, updateChatId } = useChat();

    const updateLocalStorage = (chatId: string) => {
        const storedOrder = localStorage.getItem('chatsOrder');
        if (storedOrder) {
            const chatsOrder = JSON.parse(storedOrder).filter((id: string) => id !== chatId);
            localStorage.setItem('chatsOrder', JSON.stringify(chatsOrder));
        }
    };

    const deleteChat = async (chatId: string) => {
        console.log('delete chat');
        updateDeleteChat(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.delete(`/chats/${chatId}`);
            if (response.data) {
                updateDeleteChat(prevState => ({ ...prevState, chat: response.data }));
                updateUserChats(prevState => ({
                    ...prevState,
                    chats: prevState.chats?.filter(chat => chat._id !== chatId),
                    secondUsers: prevState.secondUsers?.filter(user => 
                        Array.isArray(response.data.members) && 
                        user._id !== response.data.members.find((member: User) => member._id !== chatInfo.userChats.currentUser?._id)?._id)
                }));
                updateLocalStorage(chatId);
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