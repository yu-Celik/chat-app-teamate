import { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { Chat, UserChats } from "../../types/Chat.type/Chat.Props";
import { handleError } from "./handleErrorFunc";

const useUserChats = () => {
    const { updateUserChats } = useChat();

    useEffect(() => {
        const fetchUserChats = async () => {
            updateUserChats(prevState => ({ ...prevState, isLoading: true }));
            try {
                const response = await axios.get('/chats/findUserChats');
                const chats = response.data;
                if (chats.length > 0) {
                    const currentUser = chats[0].members[0];
                    const secondUsers = chats.map((chat: Chat) => chat.members[1]);
                    updateUserChats(prevState => ({
                        ...prevState,
                        chats,
                        currentUser,
                        secondUsers,
                    }));
                    // localStorage.setItem('userChats', JSON.stringify(chats));
                } else {
                    throw new Error('Aucun chat trouvé.');
                }
            } catch (error) {
                handleError<UserChats>(error, updateUserChats);
            } finally {
                updateUserChats(prevState => ({ ...prevState, isLoading: false }));
            }
        };

        fetchUserChats();
    }, [updateUserChats]);

};

export default useUserChats;