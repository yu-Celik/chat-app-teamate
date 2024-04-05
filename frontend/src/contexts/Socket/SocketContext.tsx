import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CurrentUser } from '../../types/Auth.type/Auth.Props';

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: { socketId: string, userId: string }[];
    userDisconnected: { userId: string, lastLogout: Date }[];
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketProvider = ({ children, currentUser }: { children: React.ReactNode, currentUser: CurrentUser }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ socketId: string, userId: string }[]>([]);
    const [userDisconnected, setUserDisconnected] = useState<{ userId: string, lastLogout: Date }[]>([]);

    useEffect(() => {
        if (currentUser) {
            const newSocket = io("https://chat-app-teamate.onrender.com", { // Pour le site chat-app-teamate.onrender.com
            // const newSocket = io("http://192.168.1.103:5000", { // Pour le site local
                withCredentials: true,
                query: {
                    userId: currentUser.data?._id,
                },
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users: { socketId: string, userId: string }[]) => {
                setOnlineUsers(users);
            });

            newSocket.on("userDisconnected", ({ userId, lastLogout }) => {
                setUserDisconnected((prev) => [...prev, { userId, lastLogout }]);
            });
        }
    }, [currentUser]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);


    return <SocketContext.Provider value={{ socket, onlineUsers, userDisconnected }}>
        {children}
    </SocketContext.Provider>
}