import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { User } from "../../types/Auth.type/Auth.Props";

const useListenCreateUser = () => {
    const { updateAllUsers } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('createUser', (user: User) => {
                updateAllUsers(prevState => ({
                    ...prevState,
                    users: [...(prevState.users || []), user]
                }));
            });

            return () => {
                socket.off('createUser');
            };
        }
    }, [socket, updateAllUsers]);
}

export default useListenCreateUser;

