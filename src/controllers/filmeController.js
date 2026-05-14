import FilmeService from '../services/filmeService.js';

class FilmeController {
    static buscar(req, res) {
        try {
            const filmes = FilmeService.buscarFilmes();
            res.status(200).json(filmes);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static buscarFilme(req, res) {
        try {
            const id = parseInt(req.params.id);
            const filme = FilmeService.buscarPorId(id);
            res.status(200).json(filme);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

    static criar(req, res) {
        try {
            const { titulo, genero, ano, nota } = req.body;
            const novoFilme = FilmeService.criarFilme(titulo, genero, ano, nota);
            res.status(201).json(novoFilme);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static alterar(req, res) {
        try {
            const { titulo, genero, ano, nota } = req.body;
            const id = parseInt(req.params.id);
            const novoFilme = FilmeService.alterarFilme(id, titulo, genero, ano, nota);
            res.status(201).json(novoFilme);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static excluir(req, res) {
        try {
            const id = parseInt(req.params.id);
            FilmeService.deletarFilme(id);
            res.status(200).json({ message: 'filme deletado com sucesso' });
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }
}

export default FilmeController;
