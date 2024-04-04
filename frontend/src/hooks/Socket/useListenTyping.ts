import { useEffect } from "react";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { useChat } from "../../contexts/ChatContext/useChatContext";

const useListenTyping = () => {
    const { socket } = useSocket();
    const { chatInfo, updateTypingState } = useChat(); 

    useEffect(() => {
        if (socket && chatInfo.chatId) {
            socket.on('userTyping', ({ from, chatId }) => {
                console.log(chatId);
                console.log(chatInfo.chatId);
                
                // Vérifiez si l'événement de frappe concerne la conversation ouverte actuelle
                if (chatInfo.chatId === chatId) {
                    // Vérifiez si l'utilisateur qui tape est un membre de la conversation
                    const isMember = chatInfo.userChats.chats.some(chat => chat._id === chatId && chat.members.some(member => member._id === from));
                    if (isMember) {
                        updateTypingState(prevState => ({ ...prevState, isTyping: true, userId: from }));
                    }
                }
            });
            
            socket.on('stopTyping', ({ chatId }) => {
                if (chatInfo.chatId === chatId) {
                    updateTypingState(prevState => ({ ...prevState, isTyping: false, userId: null }));
                }
            });

            return () => {
                socket.off('userTyping');
                socket.off('stopTyping');
            };
        }
    }, [socket, chatInfo.chatId, chatInfo.userChats.chats, updateTypingState]); 
};

export default useListenTyping;