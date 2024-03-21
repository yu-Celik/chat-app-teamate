import { ReactNode, SetStateAction, createContext, useCallback, useState } from "react";
import { User } from "../../data/userData";
import axios from "axios";
import { AuthContextProps, LoginInfo, RegisterInfo } from "../../types/Auth.Context.type/Auth.Context.Props";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState<string | null>(null);
    const [isRegisterInfo, setIsRegisterInfo] = useState<RegisterInfo>({ email: "", username: "", gender: "", password: "", confirmPassword: "", });

    const [isLogged, setIsLogged] = useState(false);
    const [isLoggedLoading, setIsLoggedLoading] = useState(false);
    const [isLoggedError, setIsLoggedError] = useState<string | null>(null);
    const [isLoggedInfo, setIsLoggedInfo] = useState<LoginInfo>({ email: "", password: "" });


    const [loading, setLoading] = useState(true);



    const updateRegisterInfo = useCallback((info: SetStateAction<RegisterInfo>) => {
        setIsRegisterInfo(info);
    }, []);

    const updateLoggedInfo = useCallback((info: SetStateAction<LoginInfo>) => {
        setIsLoggedInfo(info);
    }, []);

    const verifyUser = useCallback(async () => {
        try {
            console.log('userverify',user);
            
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/verify`, { withCredentials: true });
            console.log('response.data.user',response.data.user);
            setUser(response.data.user);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'utilisateur', error);
            setUser(null); // Assurez-vous de gérer l'utilisateur non authentifié
            setLoading(false);
        }
    }, [user]);


    const registerUser = useCallback(async () => {
        setIsRegisterLoading(true);
        setIsRegisterError(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, isRegisterInfo);
            setUser(response.data);
            setIsRegistered(true);
            setIsRegisterLoading(false);
            setIsLogged(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de l\'inscription';
                setIsRegisterError(errorMessage);
                setIsRegisterLoading(false);
                setIsRegistered(false);
            } else if (error instanceof Error) {
                setIsRegisterError(error.message);
            } else {
                setIsRegisterError('Une erreur inconnue est survenue lors de l\'inscription');
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, isLoggedInfo);
            setUser(response.data);
            setIsLogged(true);
            setIsLoggedLoading(false);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de la connexion';
                setIsLoggedError(errorMessage);
                setIsLoggedLoading(false);
                setIsLogged(false);
            } else if (error instanceof Error) {
                setIsLoggedError(error.message);
            } else {
                setIsLoggedError('Une erreur inconnue est survenue lors de la connexion');
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
            await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);
            document.cookie = 'token=; Max-Age=0';
            setUser(null);
            setIsLogged(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de la déconnexion';
                setIsLoggedError(errorMessage);
                setIsLoggedLoading(false);
                setIsLogged(false);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isRegistered, isRegisterLoading, isRegisterError, isRegisterInfo, updateRegisterInfo, registerUser, loading, verifyUser, isLogged, isLoggedError, isLoggedInfo, loginUser, isLoggedLoading, logoutUser, updateLoggedInfo }}>
            {children}
        </AuthContext.Provider>
    )
}