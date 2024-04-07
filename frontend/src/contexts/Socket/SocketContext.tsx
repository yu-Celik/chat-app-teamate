import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CurrentUser } from '../../types/Auth.type/Auth.Props';

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: { socketId: string, userId: string }[];
    disconnectedUsers: { userId: string, disconnectedAt: string }[];
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketProvider = ({ children, currentUser }: { children: React.ReactNode, currentUser: CurrentUser }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ socketId: string, userId: string }[]>([]);
    const [disconnectedUsers, setDisconnectedUsers] = useState<{ userId: string, disconnectedAt: string }[]>([]);

    useEffect(() => {
        if (!currentUser.data) return;

        const newSocket = io("https://chat-app-teamate.onrender.com", { // Pour le site chat-app-teamate.onrender.com
        // const newSocket = io("http://192.168.1.103:5000", { // Pour le site local
            withCredentials: true,
            query: { userId: currentUser.data?._id },
            transports: ['websocket'],
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });
        newSocket.connect();
        setSocket(newSocket);

        return () => {
            // Vérifiez si le socket est connecté avant de tenter de le fermer
            if (newSocket.connected) {
                newSocket.close();
            }
        };
    }, [currentUser.data]);



    // Écouteur pour les utilisateurs en ligne
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



    useEffect(() => {
        // console.log('onlineUsers', onlineUsers);
    }, [onlineUsers]);

    useEffect(() => {
        // console.log('disconnectedUsers', disconnectedUsers);
    }, [disconnectedUsers]);

    return <SocketContext.Provider value={{ socket, onlineUsers, disconnectedUsers }}>
        {children}
    </SocketContext.Provider>
}