import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './DB/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './Routes/user.routes.js';
import chatRoutes from './Routes/chat.routes.js';
import messageRoutes from './Routes/message.routes.js';
import { app, server } from './socket/socket.js';
import path from 'path';

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

// Configuration CORS
const corsOptions = {
  origin :[process.env.CLIENT_URL],
  credentials: true, // Autorise les cookies et les en-têtes d'authentification
};

app.use(cors(corsOptions));

app.use(express.json());  // pour analyser les requêtes entrantes avec un payload en JSON
app.use(cookieParser()); // pour analyser les cookies de la requête entrante

app.use('/api/users', userRoutes); // pour les routes liées aux utilisateurs
app.use('/api/chats', chatRoutes); // pour les routes liées aux chats
app.use('/api/messages', messageRoutes); // pour les routes liées aux messages

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

server.listen(PORT, '0.0.0.0', () => {
  connectToMongoDB();
  console.log(`Le serveur fonctionne sur le port : ${PORT}`);
});
