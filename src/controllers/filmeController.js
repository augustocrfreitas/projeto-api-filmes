import FilmeService from '../services/filmeService.js';

class FilmeController {
    static async buscar(req, res) {
        try {
            const filmes = await FilmeService.buscarFilmes();
            res.status(200).json(filmes);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async buscarFilme(req, res) {
        try {
            const id = req.params.id;
            const filme = await FilmeService.buscarPorId(id);
            res.status(200).json(filme);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }

    static async criar(req, res) {
        try {
            const { titulo, genero, ano, nota } = req.body;
            const novoFilme = await FilmeService.criarFilme(titulo, genero, ano, nota);
            res.status(201).json(novoFilme);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async alterar(req, res) {
        try {
            const { titulo, genero, ano, nota } = req.body;
            const id = req.params.id;
            const novoFilme = await FilmeService.alterarFilme(id, titulo, genero, ano, nota);
            res.status(201).json(novoFilme);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const id = req.params.id;
            const resposta = await FilmeService.deletarFilme(id);
            res.status(200).json({
                message: `O filme ${resposta} foi deletado com sucesso!`,
            });
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }
}

export default FilmeController;
