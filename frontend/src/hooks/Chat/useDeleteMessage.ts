import axios from '../../config/axiosConfig'; // Assurez-vous d'importer AxiosError
import { useChat } from '../../contexts/ChatContext/useChatContext';
import { handleError } from './handleErrorFunc';

const useDeleteMessage = () => {
    const { deleteMessageFromList, updateDeleteMessage } = useChat()

    const deleteMessage = async (messageId: string) => {
        console.log('deleteMessage');
        
        updateDeleteMessage(prevState => ({ ...prevState, isLoading: true }));
        try {
            const response = await axios.delete(`/messages/${messageId}`);
            const message = response.data.message;
            if (message) {
                updateDeleteMessage(prevState => ({
                    ...prevState,
                    message: response.data.message
                }));
                deleteMessageFromList(messageId);
            } else {
                updateDeleteMessage(prevState => ({ ...prevState, warning: "Le message n'a pas été supprimé" }));
            }
        } catch (error) {
            handleError(error, updateDeleteMessage);
        } finally {
            updateDeleteMessage(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    return { deleteMessage }
}

export default useDeleteMessage;

