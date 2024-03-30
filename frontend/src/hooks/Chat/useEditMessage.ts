import { useCallback } from 'react';
import { useChat } from "../../contexts/ChatContext/useChatContext";
import axios from "../../config/axiosConfig";
import { handleError } from './handleErrorFunc';

const useEditMessage = () => {
    const { chatInfo, updateMessageInList, updateSendMessageStatus } = useChat();

    const editMessage = useCallback(async (messageId: string, newContent: string) => {
        console.log('editMessage');
        updateSendMessageStatus(prevState => ({ ...prevState, isLoading: true }));

        const currentMessageIndex = chatInfo.messages.messagesList.findIndex((message) => message._id === messageId);
        if (currentMessageIndex === -1) {
            updateSendMessageStatus(prevState => ({ ...prevState, warning: 'Message non trouvé.' }));
            return;
        }

        const currentMessage = chatInfo.messages.messagesList[currentMessageIndex];
        if (currentMessage.message === newContent) {
            updateSendMessageStatus(prevState => ({ ...prevState, warning: 'Votre message n\'a pas été modifié.' }));
            return;
        }

        try {
            const response = await axios.patch(`/messages/${messageId}`, { message: newContent });
            const updatedMessage = response.data;
            if (updatedMessage) {
                updateMessageInList(prevMessagesList => prevMessagesList.map(message =>
                    message._id === messageId ? { ...message, ...updatedMessage } : message
                ));
                updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false, error: null, warning: null, isEditing: false, editId: null, messageToEdit: null }));
            } else {
                updateSendMessageStatus(prevState => ({ ...prevState, warning: "Le message n'a pas été modifié" }));
            }
        } catch (error) {
            handleError(error, updateSendMessageStatus);
        } finally {
            updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false }));
        }
    }, [chatInfo, updateMessageInList, updateSendMessageStatus]);

    return { editMessage };
};

export default useEditMessage;