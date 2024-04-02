import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextProps } from "../../types/Auth.type/AuthContext.Props";
import { CurrentUser } from "../../types/Auth.type/Auth.Props";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('chat-user') as string);
            return { data: userData || null };
        } catch (error) {
            console.error("Erreur lors de l'analyse des données utilisateur:", error);
            return { data: null };
        }
    });
    
    useEffect(() => {
        localStorage.setItem('chat-user', JSON.stringify(currentUser.data));
    }, [currentUser]);


    

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}