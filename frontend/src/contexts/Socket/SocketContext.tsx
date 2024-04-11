import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CurrentUser } from '../../types/Auth.type/Auth.Props';
import { SocketContextProps } from '../../types/Socket.type/SocketContext.Props';

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider = ({ children, currentUser }: { children: React.ReactNode, currentUser: CurrentUser }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ socketId: string, userId: string }[]>([]);
    const [disconnectedUsers, setDisconnectedUsers] = useState<{ userId: string, disconnectedAt: string }[]>([]);

    useEffect(() => {
        if (!currentUser.data) return;

        const newSocket = io("http://192.168.1.103:5000", {
            withCredentials: true,
            query: { userId: currentUser.data?._id },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });
        setSocket(newSocket);

        return () => {
            // Suppression des écouteurs d'événements pour éviter les fuites de mémoire
            newSocket.off("getOnlineUsers");
            newSocket.off("getDisconnectedUsers");
            // Vérifiez si le socket est connecté avant de tenter de le fermer
            if (newSocket.connected) {
                newSocket.close();
            }
        };
    }, [currentUser.data]);

    useEffect(() => {
        if (!socket) return;

        const handleOnlineUsers = (users: { socketId: string, userId: string }[]) => {
            setOnlineUsers(users);
        };

        socket.on("getOnlineUsers", handleOnlineUsers);

        return () => {
            socket.off("getOnlineUsers", handleOnlineUsers);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        const handleUserDisconnected = (disconnectedUsers: { userId: string, disconnectedAt: string }[]) => {
            setDisconnectedUsers(disconnectedUsers);
        };

        socket.on("getDisconnectedUsers", handleUserDisconnected);

        return () => {
            socket.off("getDisconnectedUsers", handleUserDisconnected);
        };
    }, [socket]);

    return <SocketContext.Provider value={{ socket, onlineUsers, disconnectedUsers }}>
        {children}
    </SocketContext.Provider>
}