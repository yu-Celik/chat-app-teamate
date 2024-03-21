export type User = {
    id?: number; // Identifiant de l'utilisateur
    username?: string; // Nom d'utilisateur de l'utilisateur
    email?: string; // Email de l'utilisateur
    password?: string; // Mot de passe de l'utilisateur
    gender?: string | "male" | "female"; // Genre de l'utilisateur
    profilePic?: string; // Photo de profil de l'utilisateur
    isOnline?: boolean; // Statut de l'utilisateur
    lastSeen?: string; // Dernière connexion de l'utilisateur
    notifications?: number; // Nombre de notifications
    lastNotificationSeen?: string; // Date de la dernière notification vue
};