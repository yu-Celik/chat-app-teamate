import { useCallback } from "react";
import axios from "../../config/axiosConfig";
import useAuth from "../../contexts/AuthContext/useAuthContext";

const useVerifyUser = () => {
    const { setCurrentUser } = useAuth()
    const verifyUser = useCallback(async () => {
        try {
            await axios.get('/users/verify');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Ne pas afficher l'erreur dans la console pour l'experience utilisateur
                    setCurrentUser({ data: null, isAuthChecking: false });
                    localStorage.removeItem('chat-user');
                }
            }
        }
    }, [setCurrentUser]);

    return { verifyUser };
}

export default useVerifyUser;

