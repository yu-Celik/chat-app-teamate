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
                    updateUserChats(prevState => ({
                        ...prevState,
                        chats,
                        secondUsers : chats.map((chat: Chat) => chat.members.find(member => member._id !== prevState.currentUser?._id))
                    }));
                    console.log(chats);
                    
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