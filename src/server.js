import filmeRoutes from './routes/filmeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDb from './database/connection.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 2000;

const app = express();
app.use(express.json());

connectDb();

app.use('/api/filmes', filmeRoutes);

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Teste rodando na porta ${PORT}`);
});
