import { useCallback } from "react";
import axios from "../../config/axiosConfig";
import useAuth from "../../contexts/AuthContext/useAuthContext";
import { useNavigate } from "react-router-dom";

const useVerifyUser = () => {
    const { setCurrentUser } = useAuth()
    const navigate = useNavigate();

    const verifyUser = useCallback(async () => {
        try {
            await axios.get('/users/verify');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Ne pas afficher l'erreur dans la console pour l'experience utilisateur
                    setCurrentUser({ data: null });
                    localStorage.removeItem('chat-user');
                    localStorage.removeItem('chatsOrder');
                    navigate('/');
                }
            }
        }
    }, [navigate, setCurrentUser]);

    return { verifyUser };
}

export default useVerifyUser;

