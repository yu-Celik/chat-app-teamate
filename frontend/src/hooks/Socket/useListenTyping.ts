import { useEffect } from "react";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { useChat } from "../../contexts/ChatContext/useChatContext";

const useListenTyping = () => {
    const { socket } = useSocket();
    const { chatInfo, updateTypingState } = useChat(); // chatInfo ajouté

    useEffect(() => {
        if (socket) {
            socket.on('userTyping', ({ from }) => {
                updateTypingState(prevState => ({ ...prevState, isTyping: true, userId: from }));
            });
            
            socket.on('stopTyping', () => {
                    updateTypingState(prevState => ({ ...prevState, isTyping: false, userId: null }));
            });
            return () => {
                socket.off('userTyping');
                socket.off('stopTyping');
            };
        }
    }, [socket, chatInfo.chatId, updateTypingState]); 
};

export default useListenTyping;