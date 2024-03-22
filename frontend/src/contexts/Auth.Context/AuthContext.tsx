import { ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from "react";
import { User } from "../../data/userData";
import axios from "../../config/axiosConfig";
import { AuthContextProps, LoginInfo, RegisterInfo } from "../../types/Auth.Context.type/Auth.Context.Props";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser , setCurrentUser] = useState<User | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState<string | null>(null);
    const [isRegisterInfo, setIsRegisterInfo] = useState<RegisterInfo>({ email: "", username: "", gender: "", password: "", confirmPassword: "", });

    const [isLogged, setIsLogged] = useState(false);
    const [isLoggedLoading, setIsLoggedLoading] = useState(false);
    const [isLoggedError, setIsLoggedError] = useState<string | null>(null);
    const [isLoggedInfo, setIsLoggedInfo] = useState<LoginInfo>({ email: "", password: "" });

    const [isAuthChecking, setIsAuthChecking] = useState(true); // Nouvel état pour suivre la vérification de l'authentification



    const updateRegisterInfo = useCallback((info: SetStateAction<RegisterInfo>) => {
        setIsRegisterInfo(info);
    }, []);

    const updateLoggedInfo = useCallback((info: SetStateAction<LoginInfo>) => {
        setIsLoggedInfo(info);
    }, []);



    const registerUser = useCallback(async () => {
        setIsRegisterLoading(true);
        setIsRegisterError(null);

        try {
            const response = await axios.post('/users/register', isRegisterInfo);
            setCurrentUser(response.data);
            setIsRegistered(true);
            setIsRegisterLoading(false);
            setIsLogged(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de l\'inscription';
                setIsRegisterError(errorMessage);
                setIsRegisterLoading(false);
                setIsRegistered(false);
            }
        } finally {
            setIsRegisterInfo({
                email: "",
                username: "",
                gender: "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [isRegisterInfo]);

    const loginUser = useCallback(async () => {
        setIsLoggedLoading(true);
        setIsLoggedError(null);
        try {
            const response = await axios.post('/users/login', isLoggedInfo);
            setCurrentUser(response.data);
            setIsLogged(true);
            setIsLoggedLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de la connexion';
                setIsLoggedError(errorMessage);
                setIsLoggedLoading(false);
                setIsLogged(false);
            }
        } finally {
            setIsLoggedInfo({
                email: "",
                password: "",
            });
        }
    }, [isLoggedInfo]);

    const logoutUser = useCallback(async () => {
        try {
            await axios.post('/users/logout');
            setCurrentUser(null);
            setIsLogged(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de la déconnexion';
                setIsLoggedError(errorMessage);
            }
        }
    }, []);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get('/users/verify');
                setCurrentUser(response.data.user);
                setIsLogged(true);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setIsLogged(false);
                        // Ne pas afficher l'erreur dans la console pour l'experience utilisateur
                    }
                }
            } finally {
                setIsAuthChecking(false); 
            }
        };
        verifyUser();
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser , isRegistered, isRegisterLoading, isRegisterError, isRegisterInfo, updateRegisterInfo, registerUser, isLogged, isLoggedError, isLoggedInfo, loginUser, isLoggedLoading, logoutUser, updateLoggedInfo, isAuthChecking }}>
            {children}
        </AuthContext.Provider>
    )
}