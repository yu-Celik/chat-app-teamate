import axios from 'axios';

// Configure Axios pour envoyer des cookies avec chaque requête
axios.defaults.withCredentials = true;

// Vous pouvez également configurer d'autres paramètres par défaut ici
// Par exemple, définir une URL de base pour toutes les requêtes
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL; 

// Exporter l'instance Axios configurée pour une utilisation dans toute l'application
export default axios;
