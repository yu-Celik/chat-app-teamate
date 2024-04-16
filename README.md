# Application de Chat en Temps Réel

Cette application de chat offre une expérience de messagerie instantanée riche en fonctionnalités, avec une interface utilisateur intuitive et une communication en temps réel.

## Fonctionnalités Principales

### Frontend

- Interface utilisateur réactive et conviviale développée avec React et TypeScript
- Affichage en temps réel des conversations et des messages
- Envoi, réception, édition et suppression de messages
- Indicateur de saisie en temps réel des autres utilisateurs
- Création et suppression de conversations
- Thème personnalisé et adaptatif avec Material-UI
- Organisation des chats créer personnalisable par l'utilisateur
- Notifications de nouveaux messages (en développement)
- Support des fichiers multimédias (images, vidéos) (en développement)
- Recherche d'un message dans une conversation (en développement)
- Création et suppression de groupes (en développement)

### Backend

- API RESTful robuste pour la gestion des utilisateurs, des conversations et des messages
- Communication en temps réel avec Socket.IO pour une expérience instantanée
- Authentification et autorisation sécurisées des utilisateurs avec JWT
- Stockage efficace des données avec MongoDB et Mongoose
- Validation des données et gestion des erreurs pour maintenir l'intégrité des données
- Recherche et filtrage avancés des conversations et des messages
- Notifications push pour alerter les utilisateurs des nouveaux messages (en développement)
- Gestion optimisée des fichiers multimédias (upload, stockage, accès) (en développement)
- Architecture évolutive et performances optimisées pour une expérience utilisateur fluide (en développement)

## Technologies Utilisées

### Frontend
- React avec TypeScript pour une interface utilisateur dynamique et maintenable
- Material-UI pour des composants UI esthétiques et responsives
- Socket.IO client pour une communication en temps réel fluide
- Axios pour des requêtes API simplifiées et efficaces

### Backend
- Node.js avec Express pour un serveur web robuste et évolutif
- MongoDB avec Mongoose pour un stockage de données flexible et performant
- Socket.IO pour une communication bidirectionnelle en temps réel
- JWT (JSON Web Tokens) pour une authentification sécurisée et sans état
- Multer pour une gestion simplifiée des téléchargements de fichiers

## Installation et Démarrage

1. Clonez le dépôt : `git clone https://github.com/yu-Celik/chat-app-teamate.git`
2. Installez les dépendances : `npm install` à la racine du projet et dans le dossier `frontend`
3. Configurez les variables d'environnement (DB, JWT secret, etc.)
4. Démarrez le serveur backend : `npm run server` à la racine du projet
5. Démarrez l'application frontend : `npm run dev` dans le dossier `frontend`

Profitez dès maintenant de votre application de chat en temps réel !
