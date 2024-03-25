import { useCallback, useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { UserChats, secondUsers } from "../../types/Chat.type/Chat.Props";

const useUserChats = () => {
    const [userChats, setUserChats] = useState<UserChats>({
        isLoading: false,
        chats: [],
        currentUser: {},
        secondUsers: []
    });


    const fetchUserChats = useCallback(async () => {
        
        console.log('fetchUserChats');
        setUserChats(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await axios.get('/chats/findUserChats');
            // Simplifiez la condition de mise à jour si nécessaire
            setUserChats({
                chats: response.data,
                currentUser: response.data[0]?.members[0] || {},
                secondUsers: response.data.map((chat: secondUsers) => chat.members[1]),
                isLoading: false
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des chats:', error);
            setUserChats(prev => ({ ...prev, isLoading: false }));
        }
    }, []); // Envisagez de retirer les dépendances ou de les ajuster

    const refreshChats = useCallback(() => {
        fetchUserChats();
    }, [fetchUserChats]);

    useEffect(() => {
        fetchUserChats();
    }, [fetchUserChats]);

    return { userChats, setUserChats, refreshChats };
};

export default useUserChats;