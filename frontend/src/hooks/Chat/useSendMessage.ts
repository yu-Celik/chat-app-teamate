import { useChat } from "../../contexts/ChatContext/useChatContext"
import axios from "../../config/axiosConfig";
import { handleError } from "./handleErrorFunc";

const useSendMessage = () => {
    const { updateMessages, chatInfo, updateSendMessageStatus,updateLastMessageSeen } = useChat();

    const sendMessage = async (chatId: string, message: string) => {
        updateSendMessageStatus(prevState => ({ ...prevState, isLoading: true }));
        if (chatInfo.messages.isLoading || chatInfo.sendMessageStatus.isLoading || chatInfo.messages.error) {
            updateSendMessageStatus(prevState => ({ ...prevState, warning: "Une erreur est survenue lors de l'envoi du message" }));
            return;
        }
        if (!message) {
            updateSendMessageStatus(prevState => ({ ...prevState, warning: "Le message est vide" }));
            return;
        }
        if (!chatId || chatInfo.chatId !== chatId) {
            updateSendMessageStatus(prevState => ({ ...prevState, warning: "Le chatId est invalide" }));
            return;
        }
        try {
            const response = await axios.post(`/messages`, { chatId, message });
            const messageSent = response.data;
            if (messageSent) {
                const newMessage = [messageSent, ...(chatInfo.messages.messagesList)];
                updateMessages(prevState => ({ ...prevState, messagesList: newMessage }));
                updateLastMessageSeen(prevState => ({
                    ...prevState,
                    messages: [messageSent, ...prevState.messages] // Correction ici
                }));
                updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false, error: null, warning: null, isEditing: false, editId: null, messageToEdit: null, firstMessageSend: true }));
                
            } else {
                updateSendMessageStatus(prevState => ({ ...prevState, warning: "Le message n'a pas été envoyé" }));
            }
        } catch (error) {
            handleError(error, updateSendMessageStatus);
        } finally {
            updateSendMessageStatus(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    return { sendMessage };
};

export default useSendMessage;


// Pour messages.isLoading et messages.error :
// messages.isLoading : Indique si l'application est en train de charger les messages d'une conversation. Vous pouvez l'utiliser pour afficher un indicateur de chargement (comme un spinner) à l'utilisateur pendant que les messages sont récupérés depuis le serveur. Cela améliore l'expérience utilisateur en fournissant un retour visuel que l'application travaille à récupérer les données nécessaires.
// messages.error : Contient les informations d'erreur si la récupération des messages échoue. Vous pouvez l'utiliser pour afficher un message d'erreur à l'utilisateur, lui indiquant qu'un problème est survenu lors de la tentative de récupération des messages. Cela aide à communiquer les problèmes à l'utilisateur et peut guider des actions correctives (comme réessayer).
// Pour sendMessageStatus.isLoading et sendMessageStatus.error :
// sendMessageStatus.isLoading : Indique si un message est en cours d'envoi. Cela peut être utilisé pour désactiver le bouton d'envoi ou afficher un indicateur de progression, empêchant ainsi l'utilisateur d'envoyer plusieurs fois le même message par impatience ou par erreur.
// sendMessageStatus.error : Contient les informations d'erreur si l'envoi du message échoue. Vous pouvez l'utiliser pour informer l'utilisateur de l'échec de l'envoi du message, lui permettant ainsi de tenter de renvoyer le message.
// Exemple d'Utilisation dans l'Interface Utilisateur :
// Lors de l'affichage de la liste des messages, vous pouvez vérifier messages.isLoading pour afficher un indicateur de chargement jusqu'à ce que les messages soient chargés. Si messages.error n'est pas null, vous pouvez afficher un message d'erreur.
// Lors de l'envoi d'un message, vous pouvez désactiver le bouton d'envoi et afficher un spinner basé sur sendMessageStatus.isLoading. Si sendMessageStatus.error n'est pas null, affichez un message d'erreur pour informer l'utilisateur que l'envoi a échoué.
// Ces mécanismes améliorent l'expérience utilisateur en fournissant des retours visuels et des indications claires sur l'état de l'application, rendant l'interface plus réactive et informative.