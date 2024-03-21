import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './DB/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());  // pour analyser les requêtes entrantes avec un payload en JSON
app.use(cookieParser()); // pour analyser les cookies de la requête entrante


app.use('/api/users', userRoutes); // pour les routes liées aux utilisateurs
app.use('/api/chats', chatRoutes); // pour les routes liées aux chats
app.use('/api/messages', messageRoutes); // pour les routes liées aux messages

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur !');
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Le serveur fonctionne sur le port : ${PORT}`);
});
