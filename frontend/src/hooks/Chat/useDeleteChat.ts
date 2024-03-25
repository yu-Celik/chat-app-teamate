import { useState } from "react";
import axios from "../../config/axiosConfig";
import { ChatState } from "../../types/Chat.type/Chat.Props";

const useDeleteChat = () => {
    const [deleteChatState, setDeleteChatState] = useState<ChatState>({
        data: null,
        isLoading: false,
        error: null,
    });

    const deleteChat = async (chatId: string) => {
        setDeleteChatState({ ...deleteChatState, isLoading: true });
        try {
            const response = await axios.delete(`/chats/${chatId}`);
            // console.log('delete chat', response.data);
            setDeleteChatState({ ...deleteChatState, data: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setDeleteChatState({ ...deleteChatState, error: error.message, isLoading: false });
            }
            console.log(error);
            return null;
        }
    }

    return { deleteChat, deleteChatState };
};

export default useDeleteChat;

