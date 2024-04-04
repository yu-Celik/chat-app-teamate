import axios from 'axios';

// Configure Axios pour envoyer des cookies avec chaque requête
axios.defaults.withCredentials = true;

// Vous pouvez également configurer d'autres paramètres par défaut ici
// Par exemple, définir une URL de base pour toutes les requêtes
axios.defaults.baseURL = "https://chat-app-teamate.onrender.com/api"; // Pour le site chat-app-teamate.onrender.com
// axios.defaults.baseURL = "http://192.168.1.103:5000/api"; // Pour le site en local

// Exporter l'instance Axios configurée pour une utilisation dans toute l'application
export default axios;