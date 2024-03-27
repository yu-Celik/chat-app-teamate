import { useCallback, useState } from "react";
import { Register, RegisterInfo } from "../../types/Auth.type/Auth.Props";
import axios from "../../config/axiosConfig";
import useAuth from "../../contexts/AuthContext/useAuthContext";

const useRegister = () => {

    const { setCurrentUser } = useAuth();

    const [register, setRegister] = useState<Register>({
        registerInfo: { email: "", username: "", gender: "", password: "", confirmPassword: "", }, // Permet de stocker les informations de l'inscription
        registerError: null, // Permet de stocker l'erreur de l'inscription
        isRegisterLoading: false, // Permet de stocker le statut de la demande d'inscription
        isRegistered: false, // Permet de stocker le statut de l'inscription
    });


    const updateRegisterInfo = useCallback((info: RegisterInfo) => {
        setRegister((prev) => ({ ...prev, registerInfo: info }));
    }, []);

    const registerUser = useCallback(async () => {

        setRegister((prev) => ({
            ...prev,
            isRegisterLoading: true,
            registerError: null,
        }));

        try {
            const response = await axios.post('/users/register', register.registerInfo);
            setCurrentUser({ data: response.data });
            setRegister((prev) => ({ ...prev, isRegistered: true }));
            localStorage.setItem('chat-user', JSON.stringify(response.data));

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || 'Une erreur inconnue est survenue lors de l\'inscription';
                setRegister((prev) => ({ ...prev, registerError: errorMessage }));
            }
        } finally {

            setRegister((prev) => ({ 
                ...prev, 
                registerInfo: {
                    email: "",
                    username: "",
                    gender: "",
                    password: "",
                    confirmPassword: "",
                },
                isRegisterLoading: false 
            }));
        }
    }, [register.registerInfo, setCurrentUser]);

    return { register, updateRegisterInfo, registerUser };
}

export default useRegister;

