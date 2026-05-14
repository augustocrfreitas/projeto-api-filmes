import FilmeRepository from '../repositories/filmeRepository.js';

class FilmeService {
    static buscarFilmes() {
        return FilmeRepository.listaTodos();
    }

    static buscarPorId(id) {
        const filme = FilmeRepository.buscarPorId(id);
        if (!filme) {
            throw new Error('Filme não encontrado');
        }
        return filme;
    }

    static criarFilme(titulo, genero, ano, nota) {
        if (!titulo || !genero) {
            throw new Error('Titulo e genero são obrigatórios');
        }
        const id = FilmeRepository.listaTodos().length + 1;
        const novoFilme = {
            id,
            titulo,
            genero,
            ano,
            nota,
        };
        FilmeRepository.adicionarFilme(novoFilme);
        return novoFilme;
    }

    static alterarFilme(id, titulo, genero, ano, nota) {
        const filmeExiste = FilmeRepository.buscarPorId(id);
        if (!filmeExiste) {
            throw new Error('Filme não encontrado');
        }
        const novoFilme = {
            titulo,
            genero,
            ano,
            nota,
        };
        FilmeRepository.alterarFilme(id, novoFilme);
        return novoFilme;
    }

    static deletarFilme(id) {
        const filmeExiste = FilmeRepository.buscarPorId(id);
        if (!filmeExiste) {
            throw new Error('Filme não existe');
        }

        FilmeRepository.deletarFilme(id);
    }
}

export default FilmeService;
