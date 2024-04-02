import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CurrentUser } from '../../types/Auth.type/Auth.Props';

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: { socketId: string, userId: string }[];
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketProvider = ({ children, currentUser }: { children: React.ReactNode, currentUser: CurrentUser }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ socketId: string, userId: string }[]>([]);

    useEffect(() => {
        if (currentUser) {
            const newSocket = io("https://chat-app-teamate.onrender.com", {
                withCredentials: true,
                query: {
                    userId: currentUser.data?._id,
                },
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users: { socketId: string, userId: string }[]) => {
                setOnlineUsers(users);
            });

            // La fonction de nettoyage ferme le socket sans rien retourner
            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    

    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}