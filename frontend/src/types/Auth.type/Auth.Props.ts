export type User = {
    _id?: string | null; // Identifiant de l'utilisateur
    username?: string | null; // Nom d'utilisateur de l'utilisateur
    email?: string | null; // Email de l'utilisateur
    password?: string | null; // Mot de passe de l'utilisateur
    gender?: string | "male" | "female"; // Genre de l'utilisateur
    profilePic?: string | null; // Photo de profil de l'utilisateur
    lastSeen?: string | null; // Dernière connexion de l'utilisateur
    notifications?: number | null; // Nombre de notifications
    lastNotificationSeen?: string | null; // Date de la dernière notification vue
    token?: string | null; // Token de l'utilisateur
    lastLogout?: string | null; // Dernière connexion de l'utilisateur
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
}
