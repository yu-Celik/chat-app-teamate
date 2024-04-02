import axios from '../../config/axiosConfig'; // Assurez-vous d'importer AxiosError
import { useChat } from '../../contexts/ChatContext/useChatContext';
import { handleError } from './handleErrorFunc';

const useDeleteMessage = () => {
    const { deleteMessageFromList, updateDeleteMessage, updateLastMessageSeen, updateSendMessageStatus } = useChat()

    const deleteMessage = async (messageId: string) => {
        console.log('deleteMessage');

        updateDeleteMessage(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.delete(`/messages/${messageId}`);
            if (response.status === 200) {
                // Supprimez le message du frontend seulement si le serveur a confirmé la suppression
                deleteMessageFromList(messageId);
                updateDeleteMessage(prevState => ({
                    ...prevState,
                    message: response.data.message
                }));
                updateLastMessageSeen(prevState => ({
                    ...prevState,
                    messages: prevState.messages.filter(message => message._id !== messageId)
                }));
                updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false, error: null, warning: null, isEditing: false, editId: null, messageToEdit: null, firstMessageSend: true }));
            } else {
                updateSendMessageStatus(prevState => ({ ...prevState, warning: "Le message n'a pas été supprimé" }));
            }
        } catch (error) {
            handleError(error, updateSendMessageStatus);
        } finally {
            updateDeleteMessage(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    return { deleteMessage }
}

export default useDeleteMessage;

