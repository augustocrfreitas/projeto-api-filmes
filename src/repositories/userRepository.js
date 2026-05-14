import User from '../models/userModel.js';

class UserRepo {
    static async buscar() {
        const usuarios = await User.find();
        return usuarios;
    }

    static async buscarPorEmail(email) {
        const usuario = await User.findOne({ email });
        return usuario;
    }

    static async adicionarUser(user) {
        await User.create(user);
        return user;
    }
}

export default UserRepo;
