import Filme from '../models/filmeModel.js';

class FilmeRepository {
    static async listaTodos() {
        const filmes = await Filme.find();
        console.log(filmes);
        return filmes;
    }

    static async buscarPorId(id) {
        const filme = await Filme.findById(id);
        return filme;
    }

    static async adicionarFilme(novoFilme) {
        const filme = await Filme.create(novoFilme);
        return filme;
    }

    static async alterarFilme(id, novoFilme) {
        await Filme.findByIdAndUpdate(id, novoFilme);
    }

    static async deletarFilme(id) {
        const filme = await Filme.findByIdAndDelete(id);
        return filme;
    }
}

export default FilmeRepository;
