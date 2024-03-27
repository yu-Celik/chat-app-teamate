import { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";

const useGetAllUsers = () => {
    const { updateAllUsers } = useChat();


    useEffect(() => {
        const getAllUsers = async () => {
            console.log('getAllUsers');
            updateAllUsers({ users: [], isLoading: true, error: null });
            try {
                const response = await axios.get('/users');
                updateAllUsers({ users: response.data, isLoading: false, error: null });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    updateAllUsers({ users: [], isLoading: false, error: error.message });
                }
            }
        };
        getAllUsers();
    }, [updateAllUsers]);
}

export default useGetAllUsers;