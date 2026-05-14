import mongoose from 'mongoose';

const filmeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    ano: Number,
    nota: Number,
});

export default mongoose.model('Filme', filmeSchema);
