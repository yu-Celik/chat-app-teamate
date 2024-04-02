import { useCallback } from "react";
import axios from "../../config/axiosConfig";
import useAuth from "../../contexts/AuthContext/useAuthContext";

const useLogout = () => {
    const { setCurrentUser } = useAuth()

    const logoutUser = useCallback(async () => {
        try {
            await axios.post('/users/logout');
            setCurrentUser({ data: null });
            localStorage.removeItem('chat-user');
            localStorage.removeItem('chatsOrder');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de la déconnexion';
                console.log(errorMessage);
            }
        }
    }, [setCurrentUser]);

    return { logoutUser }
}

export default useLogout;
