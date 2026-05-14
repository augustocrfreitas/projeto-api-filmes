let usuarios = [];

class UserRepo {
    static buscar() {
        return usuarios;
    }

    static buscarPorEmail(email) {
        const usuario = usuarios.find(f => f.email === email);
        return usuario;
    }

    static adicionarUser(user) {
        usuarios.push(user);
        return user;
    }
}

export default UserRepo;
