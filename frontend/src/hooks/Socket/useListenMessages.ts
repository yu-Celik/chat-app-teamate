import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import ReceiveMessage from './../../assets/sounds/ReceiveMessage.mp3';
import useAuth from "../../contexts/AuthContext/useAuthContext";

const useListenMessages = () => {
    const { updateMessages, updateLastMessageSeen, updateSendMessageStatus } = useChat();
    const { socket } = useSocket();
    const {currentUser} = useAuth()

    useEffect(() => {
        // Vérifiez si socket n'est pas null avant de s'abonner aux événements
        if (socket) {
            socket.on('newMessage', (message) => {
                updateMessages(prevState => ({
                    ...prevState,
                    messagesList: [message, ...prevState.messagesList]
                }));
                updateLastMessageSeen(prevState => ({
                    ...prevState,
                    messages: [message, ...prevState.messages]
                }));
                updateSendMessageStatus(prevState => ({ ...prevState, firstMessageSend: true }));
                if(currentUser.data?._id !== message.senderId){
                    const sound = new Audio(ReceiveMessage);
                    sound.play();
                }
            });

            // Nettoyer l'écouteur d'événements lors du démontage du composant
            return () => {
                socket.off('newMessage');
            };
        }
    }, [socket, updateMessages, updateLastMessageSeen, updateSendMessageStatus]);
}

export default useListenMessages;