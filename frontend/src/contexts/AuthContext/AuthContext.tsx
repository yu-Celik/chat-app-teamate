import { ReactNode, createContext, useState } from "react";
import { AuthContextProps } from "../../types/Auth.type/AuthContext.Props";
import { CurrentUser } from "../../types/Auth.type/Auth.Props";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        data: JSON.parse(localStorage.getItem('chat-user') as string) || null,
    })




    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}