import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Banco de Dados Conectado com sucesso!');
    } catch (error) {
        console.log('Erro :: ', error);
    }
};

export default connectDb;
