import { useCallback, useState } from "react";
import { Login, LoginInfo } from "../../types/Auth.type/Auth.Props";
import axios from "../../config/axiosConfig";
import useAuth from "../../contexts/AuthContext/useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const [login, setLogin] = useState<Login>({
        loginInfo: { email: "", password: "" }, // Permet de stocker les informations de la connexion
        loginError: null, // Permet de stocker l'erreur de la connexion
        isLoggedLoading: false, // Permet de stocker le statut de la demande de connexion
        isLogged: false, // Permet de stocker le statut de la connexion
    });

    const updateLoginInfo = useCallback((info: LoginInfo) => {
        setLogin((prev) => ({ ...prev, loginInfo: info }));
    }, []);

    const loginUser = useCallback(async (loginInfo: LoginInfo) => {
        setLogin((prev) => ({
            ...prev,
            isLoggedLoading: true,
            loginError: null,
        }));
    
        try {
            const response = await axios.post('/users/login', loginInfo);
            setCurrentUser({ data: response.data });
            setLogin((prev) => ({ ...prev, isLogged: true }));
            localStorage.setItem('chat-user', JSON.stringify(response.data));
            updateLoginInfo({ email: '', password: '' });
            navigate('/accueil');
            console.log('Connexion réussie');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de la connexion';
                setLogin((prev) => ({ ...prev, loginError: errorMessage }));
                console.log('Connexion échouée');
            }
        } finally {
            setLogin((prev) => ({
                ...prev,
                isLoggedLoading: false
            }));
        }
    }, [navigate, setCurrentUser, updateLoginInfo]);

    return { login, updateLoginInfo, loginUser };
}

export default useLogin;

