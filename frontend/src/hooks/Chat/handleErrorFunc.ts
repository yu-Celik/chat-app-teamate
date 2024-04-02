import { AxiosError } from "axios";
import axios from "../../config/axiosConfig";

// Définition d'un type générique pour les fonctions de mise à jour
type UpdateFunction<T> = (updateFunction: (prevState: T) => T) => void;

type ErrorResponse = {
    message: string;
}

// Fonction de type garde pour vérifier si une erreur est une AxiosError
function isAxiosError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
}

export const handleError = <T>(error: unknown, updateState: UpdateFunction<T>) => {
    console.error('Erreur lors de la récupération des données:', error);
    let errorMessage: string;
    if (isAxiosError(error)) {
        // Si l'erreur contient une réponse du serveur, utilisez le message d'erreur de cette réponse
        const errorData = error.response?.data as ErrorResponse | undefined;
        errorMessage = errorData && errorData.message ? errorData.message : error.message;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else {
        errorMessage = 'Une erreur inconnue est survenue.';
    }
    // Met à jour l'état avec le message d'erreur, et réinitialise les autres champs comme avant
    updateState(prevState => ({ ...prevState, isLoading: false, error: errorMessage, warning: errorMessage, isEditing: false, editId: null, messageToEdit: null }));
};