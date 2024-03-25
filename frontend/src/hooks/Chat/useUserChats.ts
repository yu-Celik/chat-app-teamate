import { useCallback, useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { Chat, UserChats } from "../../types/Chat.type/Chat.Props";

const useUserChats = () => {
    const [userChats, setUserChats] = useState<UserChats>({
        isLoading: false,
        chats: [],
        currentUser: {},
        secondUsers: []
    });

    const updateUserChats = useCallback((newChats: Chat[]) => {
        setUserChats(prevState => ({
            ...prevState,
            chats: newChats,
            currentUser: newChats[0]?.members[0] || {},
            secondUsers : newChats.map((chat: Chat) => chat.members[1]),
        }));
    }, []);

    useEffect(() => {

        const fetchUserChats = async () => {

            console.log('fetchUserChats');
            setUserChats(prev => ({ ...prev, isLoading: true }));

            try {
                const response = await axios.get('/chats/findUserChats');
                // Simplifiez la condition de mise à jour si nécessaire
                // console.log("response", response.data);

                setUserChats({
                    chats: response.data,
                    currentUser: response.data[0]?.members[0] || {},
                    secondUsers: response.data.map((chat: Chat) => chat.members[1]),
                    isLoading: false
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des chats:', error);
                setUserChats(prev => ({ ...prev, isLoading: false }));
            }
        };
        fetchUserChats();
    }, []);

    return { userChats, updateUserChats };
};

export default useUserChats;