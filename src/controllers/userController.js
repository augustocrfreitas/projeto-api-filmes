import UserService from '../services/userService.js';

class UserController {
    static async listar(req, res) {
        try {
            const resposta = await UserService.listar();
            res.status(200).json(resposta);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const resposta = await UserService.cadastrar(name, email, password);
            res.status(201).json(resposta);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const resposta = await UserService.login(email, password);
            res.status(200).json(resposta);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    }
}

export default UserController;
