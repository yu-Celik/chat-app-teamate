import { Socket } from 'socket.io-client';


export type SocketContextProps = {
    socket: Socket | null;
    onlineUsers: { socketId: string, userId: string }[];
    disconnectedUsers: { userId: string, disconnectedAt: string }[];

}

