import { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { handleError } from "./handleErrorFunc";

const useGetAllUsers = () => {
    const { updateAllUsers } = useChat();

    useEffect(() => {
        const getAllUsers = async () => {
            updateAllUsers(prevState => ({ ...prevState, isLoading: true }));
            try {
                const response = await axios.get('/users');
                const users = response.data;
                if (users.length > 0) {
                    updateAllUsers(prevState => ({ ...prevState, users}));
                } else {
                    throw new Error('Aucun utilisateur trouvé.');
                }
            } catch (error) {
                handleError(error, updateAllUsers);
            } finally {
                updateAllUsers(prevState => ({ ...prevState, isLoading: false }));
            }
        };

        getAllUsers();
    }, [updateAllUsers]);
};

export default useGetAllUsers;