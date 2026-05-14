import UserRepo from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

class UserService {
    static async listar() {
        const users = await UserRepo.buscar();

        if (!users) {
            throw new Error('Não existem usuários cadastrados');
        }
        return users;
    }

    static async cadastrar(name, email, password) {
        const isUser = await UserRepo.buscarPorEmail(email);

        if (isUser) {
            throw new Error('Já existe cadastro no e-mail informado');
        }

        let hash = await bcrypt.hash(password, 10);

        const user = { name, email, password: hash };
        await UserRepo.adicionarUser(user);

        const token = jwt.sign({ email, name }, secret, { expiresIn: '1d' });

        return { name, email, token };
    }

    static async login(email, password) {
        const isUser = await UserRepo.buscarPorEmail(email);

        if (!isUser) {
            throw new Error('E-mail inválido');
        }

        const senhaCorreta = await bcrypt.compare(password, isUser.password);

        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        }

        const name = isUser.name;

        const token = jwt.sign({ email, name }, secret, { expiresIn: '1d' });

        return { name, email, token };
    }
}

export default UserService;
