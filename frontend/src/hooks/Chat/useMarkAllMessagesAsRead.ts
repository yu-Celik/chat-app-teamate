import { useCallback } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import axios from "../../config/axiosConfig";
import { handleError } from "./handleErrorFunc";

const useMarkAllMessagesAsRead = () => {
    const { chatInfo, updateMessageInList, updateSendMessageStatus } = useChat();

    const markAllMessagesAsRead = useCallback(async (chatId: string) => {
        console.log('markAllMessagesAsRead');
        updateSendMessageStatus(prevState => ({ ...prevState, isLoading: true }))
        if (chatInfo.chatId !== chatId) return;
        try {
            const response = await axios.patch(`/messages/markAsRead/${chatId}`);
            if (response.status === 201) {
                updateMessageInList(prevMessagesList => prevMessagesList.map(message =>
                    message.chatId === chatId ? { ...message, read: true } : message
                ));
            }
        } catch (error) {
            handleError(error, updateSendMessageStatus);
        } finally {
            updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [chatInfo.chatId, updateMessageInList, updateSendMessageStatus]);

    return { markAllMessagesAsRead };
};

export default useMarkAllMessagesAsRead;


