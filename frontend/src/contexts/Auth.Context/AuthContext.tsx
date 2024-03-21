import { ReactNode, createContext, useCallback, useState } from "react";
import { User } from "../../data/userData";
import axios from "axios";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(true);
    const [isRegisterError, setIsRegisterError] = useState();
    const [isRegisterInfo, setIsRegisterInfo] = useState({
        email: "",
        username: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });


    const register = useCallback(async () => {

        setIsRegisterLoading(true);
        setIsRegisterError(false);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, isRegisterInfo);
            setUser(response.data);
            setIsRegistered(true);
        } catch (error) {
            console.log('response', error);
            setIsRegisterError(error);
        } finally {
            setIsRegisterLoading(false);
            setIsRegisterInfo({
                email: "",
                username: "",
                gender: "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [isRegisterInfo])

}

