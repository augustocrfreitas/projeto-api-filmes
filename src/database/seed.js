import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Filme from '../models/filmeModel.js';

dotenv.config();

const filmes = [];

await mongoose.connect(process.env.MONGO_URL);
console.log('Conectado ao MongoDB...');

// await Filme.deleteMany();
// console.log('Filmes anteriores removidos...');

await Filme.insertMany(filmes);
console.log(`${filmes.length} filmes inseridos com sucesso!`);

await mongoose.disconnect();
console.log('Desconectado.');
