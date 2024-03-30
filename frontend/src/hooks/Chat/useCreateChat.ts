import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { handleError } from "./handleErrorFunc";

const useCreateChat = () => {
    const { updateCreateChat, chatInfo, updateUserChats, updateChatId } = useChat();

    const createChat = async (secondUserId: string) => {
        console.log('createChat');
        updateCreateChat(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.post('/chats', { secondUserId });
            const chat = response.data;
            if (chat && chat._id) { // Sécurise la réponse
                updateCreateChat(prevState => ({ ...prevState, chat: chat }));

                // Créer une nouvelle liste de chats en ajoutant le nouveau chat
                const newUserChats = [...(chatInfo.userChats.chats || []), chat];
                const secondUsers = [...(chatInfo.userChats.secondUsers || []), chat.members[1]];

                updateUserChats(prevState => ({ ...prevState, chats: newUserChats, currentUser: chat.members[0], secondUsers: secondUsers }));
                updateChatId(chat._id);
                // Gestion du localStorage
                const storedOrder = localStorage.getItem('chatsOrder');
                const chatsOrder = storedOrder ? JSON.parse(storedOrder) : chatInfo.userChats.chats.map(chat => chat._id);
                chatsOrder.push(chat._id);
                localStorage.setItem('chatsOrder', JSON.stringify(chatsOrder));
            } else {
                throw new Error("Données du chat invalides");
            }   
        } catch (error) {
            handleError(error, updateCreateChat);
        } finally {
            updateCreateChat(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    return { createChat };
};

export default useCreateChat;

