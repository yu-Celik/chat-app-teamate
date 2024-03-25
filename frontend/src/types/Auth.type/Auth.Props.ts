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

export type Login = {
    loginInfo: LoginInfo;
    loginError: string | null;
    isLoggedLoading: boolean;
    isLogged: boolean;
}


export type Register = {
    registerInfo: RegisterInfo;
    registerError: string | null;
    isRegisterLoading: boolean;
    isRegistered: boolean;
}

export type CurrentUser = {
    data: User | null;
    isAuthChecking: boolean;
}
