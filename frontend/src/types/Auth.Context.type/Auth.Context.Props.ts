export type AuthContextProps = {
    currentUser: User | null;
    isRegistered: boolean;
    isRegisterLoading: boolean;
    isRegisterError: string | null;
    isRegisterInfo:  RegisterInfo;
    isLogged: boolean;
    isLoggedError: string | null;
    isLoggedInfo: LoginInfo;
    isLoggedLoading: boolean;
    isAuthChecking: boolean;
    updateRegisterInfo: (isRegisterInfo: RegisterInfo) => void;
    updateLoggedInfo: (isLoggedInfo: LoginInfo) => void;
    registerUser: (isRegisterInfo: RegisterInfo) => Promise<void>;
    loginUser: (isLoggedInfo: LoginInfo) => Promise<void>;
    logoutUser: () => Promise<void>;
}


export type User = {
    _id?: string; // Identifiant de l'utilisateur
    username?: string; // Nom d'utilisateur de l'utilisateur
    email?: string; // Email de l'utilisateur
    password?: string; // Mot de passe de l'utilisateur
    gender?: string | "male" | "female"; // Genre de l'utilisateur
    profilePic?: string; // Photo de profil de l'utilisateur
    isOnline?: boolean; // Statut de l'utilisateur
    lastSeen?: string; // Dernière connexion de l'utilisateur
    notifications?: number; // Nombre de notifications
    lastNotificationSeen?: string; // Date de la dernière notification vue
    token?: string; // Token de l'utilisateur
};

export type RegisterInfo = {
    email: string;
    username: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

export type LoginInfo = {
    email: string;
    password: string;
}

