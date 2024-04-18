# Application de Chat en Temps Réel avec React, TypeScript et Socket.IO

Cette application de chat offre une expérience de messagerie instantanée riche en fonctionnalités, avec une interface utilisateur intuitive et une communication en temps réel. Elle est développée avec React, TypeScript et Material-UI pour le frontend, et Node.js, Express, Socket.IO et MongoDB pour le backend.

## Fonctionnalités Principales

### Frontend

- Interface utilisateur réactive et conviviale développée avec React, TypeScript et Material-UI
- Affichage en temps réel des conversations et des messages
- Envoi, réception, édition et suppression de messages
- Indicateur de saisie en temps réel des autres utilisateurs
- Création et suppression de conversations
- Thème personnalisé et adaptatif avec Material-UI
- Organisation des chats créer personnalisable par l'utilisateur
- Authentification et inscription des utilisateurs

### Backend

- API RESTful robuste pour la gestion des utilisateurs, des conversations et des messages
- Communication en temps réel avec Socket.IO pour une expérience instantanée
- Authentification et autorisation sécurisées des utilisateurs avec JWT
- Stockage efficace des données avec MongoDB et Mongoose
- Validation des données et gestion des erreurs pour maintenir l'intégrité des données
- Recherche et filtrage avancés des conversations et des messages
- Gestion des événements Socket.IO pour une communication en temps réel fluide

## Technologies Utilisées

### Frontend
- React avec TypeScript pour une interface utilisateur dynamique et maintenable
- Material-UI pour des composants UI esthétiques et responsives
- Tailwind pour l'unification du style en général
- Socket.IO client pour une communication en temps réel fluide
- Axios pour des requêtes API simplifiées et efficaces
- React Router pour la navigation entre les pages
- Contexte React pour la gestion de l'état global

### Backend
- Node.js avec Express pour un serveur web robuste et évolutif
- MongoDB avec Mongoose pour un stockage de données flexible et performant
- Socket.IO pour une communication bidirectionnelle en temps réel
- JWT (JSON Web Tokens) pour une authentification sécurisée et sans état
- Bcrypt pour le hachage sécurisé des mots de passe
- Multer pour une gestion simplifiée des téléchargements de fichiers

### Roadmap

- Notifications de nouveaux messages
- Support des fichiers multimédias (images, vidéos)
- Recherche de messages dans une conversation
- Création et suppression de conversations de groupe
- Optimisation des performances et de l'architecture

## Installation et Démarrage

1. Clonez le dépôt : `git clone https://github.com/yu-Celik/chat-app-teamate.git`
2. Installez les dépendances : `npm install` à la racine du projet et dans le dossier `frontend`
3. Configurez les variables d'environnement (DB, JWT secret, etc.)
4. Démarrez le serveur backend : `npm run server` à la racine du projet
5. Démarrez l'application frontend : `npm run dev` dans le dossier `frontend`

