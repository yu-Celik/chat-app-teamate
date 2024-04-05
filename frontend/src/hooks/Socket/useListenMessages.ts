import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import ReceiveMessage from './../../assets/sounds/ReceiveMessage.mp3';
import useAuth from "../../contexts/AuthContext/useAuthContext";
import { Message } from "../../types/Chat.type/Chat.Props";

const useListenMessages = () => {
    const { updateMessages, updateLastMessageSeen, updateSendMessageStatus, chatInfo } = useChat();
    const { socket } = useSocket();
    const { currentUser } = useAuth()


    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (message: Message) => {
                // Mettre à jour les messages de la conversation actuelle
                 // Les nouveaux messages sont ajoutés au début de la liste pour correspondre à l'ordre d'affichage avec flex-direction: column-reverse
                if (chatInfo.chatId === message.chatId) {
                    updateMessages(prevState => ({
                        ...prevState,
                        messagesList: [message, ...prevState.messagesList]
                    }));
                    if (currentUser.data?._id !== message.senderId) {
                        const sound = new Audio(ReceiveMessage);
                        sound.play();
                    }
                }
                // Mettre à jour le dernier message vu pour toutes les conversations
                updateLastMessageSeen(prevState => {
                    const existingMessageIndex = prevState.messages.findIndex(m => m.chatId === message.chatId);
                    if (existingMessageIndex !== -1) {
                        // Remplacer le message existant par le nouveau si la conversation est déjà dans la liste
                        const updatedMessages = [...prevState.messages];
                        updatedMessages[existingMessageIndex] = message;
                        return { ...prevState, messages: updatedMessages };
                    } else {
                        // Ajouter le nouveau message à la liste si la conversation n'est pas déjà présente
                        return { ...prevState, messages: [...prevState.messages, message] };
                    }
                });
                updateSendMessageStatus(prevState => ({ ...prevState, firstMessageSend: true }));
            });

            return () => {
                socket.off('newMessage');
            };
        }
    }, [socket, updateMessages, updateLastMessageSeen, updateSendMessageStatus, currentUser.data?._id, chatInfo.chatId]);
}

export default useListenMessages;