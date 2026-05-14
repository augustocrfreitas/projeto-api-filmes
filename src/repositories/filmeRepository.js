let filmes = [
    { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica', ano: 2014, nota: 8.6 },
    { id: 2, titulo: 'O Poderoso Chefão', genero: 'Drama', ano: 1972, nota: 9.2 },
    { id: 3, titulo: 'Parasita', genero: 'Thriller', ano: 2019, nota: 8.5 },
    { id: 4, titulo: 'Coringa', genero: 'Drama', ano: 2019, nota: 8.4 },
    { id: 5, titulo: 'Matrix', genero: 'Ficção Científica', ano: 1999, nota: 8.7 },
];

class FilmeRepository {
    static listaTodos() {
        return filmes;
    }

    static buscarPorId(id) {
        return filmes.find(item => item.id === id);
    }

    static adicionarFilme(novoFilme) {
        filmes.push(novoFilme);
    }

    static alterarFilme(id, novoFilme) {
        const { titulo, genero, ano, nota } = novoFilme;

        const filme = filmes.find(filme => filme.id === id);
        filme.titulo = titulo;
        filme.genero = genero;
        filme.ano = ano;
        filme.nota = nota;
    }

    static deletarFilme(id) {
        filmes = filmes.filter(f => f.id !== id);
    }
}

export default FilmeRepository;
