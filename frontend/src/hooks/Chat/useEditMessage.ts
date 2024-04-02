import { useCallback } from 'react';
import { useChat } from "../../contexts/ChatContext/useChatContext";
import axios from "../../config/axiosConfig";
import { handleError } from './handleErrorFunc';

const useEditMessage = () => {
    const { chatInfo, updateMessageInList, updateSendMessageStatus, updateLastMessageSeen } = useChat();

    const editMessage = useCallback(async (messageId: string, newContent: string) => {
        console.log('editMessage');
        if (!newContent.trim()) {
            updateSendMessageStatus(prevState => ({ ...prevState, warning: 'Le contenu du message ne peut pas être vide.' }));
            return;
        }
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

        updateSendMessageStatus(prevState => ({ ...prevState, isLoading: true }));


        try {
            const response = await axios.patch(`/messages/${messageId}`, { message: newContent.trim() });
            const updatedMessage = response.data;
            if (updatedMessage) {
                updateMessageInList(prevMessagesList => prevMessagesList.map(message =>
                    message._id === messageId ? { ...message, ...updatedMessage } : message
                ));
                updateLastMessageSeen(prevState => {
                    if (prevState.messages.some(message => message._id === messageId)) {
                        return {
                            ...prevState,
                            messages: prevState.messages.map(message =>
                                message._id === messageId ? { ...message, ...updatedMessage } : message
                            )
                        };
                    }
                    return prevState;
                });
                updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false, error: null, warning: null, isEditing: false, editId: null, messageToEdit: null, firstMessageSend: true }));
            } else {
                updateSendMessageStatus(prevState => ({ ...prevState, warning: 'Votre message n\'a pas été modifié.' }));
            }
        } catch (error) {
            handleError(error, updateSendMessageStatus);
        } finally {
            updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false }));
        }
    }, [chatInfo.messages.messagesList, updateLastMessageSeen, updateMessageInList, updateSendMessageStatus]);

    return { editMessage };
};

export default useEditMessage;