import FilmeRepository from '../repositories/filmeRepository.js';

class FilmeService {
    static async buscarFilmes({ titulo, genero, ano, skip, limit }) {
        const filtros = {};

        if (titulo) filtros.titulo = titulo;
        if (genero) filtros.genero = genero;
        if (ano) filtros.ano = Number(ano);

        return await FilmeRepository.listaTodos(filtros, skip, limit);
    }

    static async buscarPorId(id) {
        const filme = await FilmeRepository.buscarPorId(id);
        if (!filme) {
            throw new Error('Filme não encontrado');
        }
        return filme;
    }

    static async criarFilme(titulo, genero, ano, nota) {
        if (!titulo || !genero) {
            throw new Error('Titulo e genero são obrigatórios');
        }

        const novoFilme = {
            titulo,
            genero,
            ano,
            nota,
        };
        await FilmeRepository.adicionarFilme(novoFilme);
        return novoFilme;
    }

    static async alterarFilme(id, titulo, genero, ano, nota) {
        const filmeExiste = await FilmeRepository.buscarPorId(id);
        if (!filmeExiste) {
            throw new Error('Filme não encontrado');
        }
        const novoFilme = {
            titulo,
            genero,
            ano,
            nota,
        };
        await FilmeRepository.alterarFilme(id, novoFilme);
        return novoFilme;
    }

    static async deletarFilme(id) {
        const filmeExiste = await FilmeRepository.buscarPorId(id);
        if (!filmeExiste) {
            throw new Error('Filme não existe');
        }

        await FilmeRepository.deletarFilme(id);
    }
}

export default FilmeService;
