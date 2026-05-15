# 🎬 API de Filmes

API RESTful para gerenciamento de filmes com autenticação JWT, validação de dados, filtros, paginação e documentação interativa.

🌐 **Deploy:** [https://projeto-api-filmes-production.up.railway.app](https://projeto-api-filmes-production.up.railway.app/api/filmes)

📖 **Documentação interativa:** [https://projeto-api-filmes-production.up.railway.app/docs](https://projeto-api-filmes-production.up.railway.app/docs)

## 🚀 Tecnologias

- **Node.js** — ambiente de execução
- **Express** — framework web
- **MongoDB** + **Mongoose** — banco de dados e ODM
- **JWT** — autenticação
- **Bcrypt** — criptografia de senhas
- **Zod** — validação de dados
- **Scalar** + **Swagger/OpenAPI** — documentação interativa
- **ESLint** + **Prettier** — qualidade e formatação de código

## 📁 Estrutura do projeto

```
src/
├── controllers/       # Recebe as requisições e envia as respostas
├── services/          # Regras de negócio
├── repositories/      # Acesso ao banco de dados
├── models/            # Schemas do Mongoose e validações Zod
├── routes/            # Definição das rotas
├── middlewares/       # Autenticação e validação
├── database/          # Conexão com o MongoDB e seed
├── docs/              # Configuração do Swagger/Scalar
└── server.js          # Ponto de entrada da aplicação
```

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- MongoDB Atlas ou instância local do MongoDB

### Instalação

```bash
# Clone o repositório
git clone https://github.com/augustocrfreitas/projeto-api-filmes.git

# Entre na pasta
cd projeto-api-filmes

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=2000
MONGO_URL=sua_connection_string_do_mongodb
JWT_SECRET=sua_chave_secreta_jwt
```

### Rodando o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:2000`

### Populando o banco de dados

Para inserir filmes de exemplo no banco:

```bash
node src/database/seed.js
```

## 📖 Documentação

Acesse a documentação interativa online:

🔗 [https://projeto-api-filmes-production.up.railway.app/docs](https://projeto-api-filmes-production.up.railway.app/docs)

Ou localmente em `http://localhost:2000/docs` após rodar o projeto.

A documentação inclui todas as rotas, schemas, exemplos de requisição e resposta, e suporte a autenticação JWT — basta clicar em **Authorize** e inserir o token.

## 🔐 Autenticação

A API usa autenticação via **JWT (JSON Web Token)**. Rotas protegidas exigem o token no header:

```
Authorization: Bearer seu_token_aqui
```

Para obter o token, faça login na rota `POST /api/users/login`.

## 📌 Rotas

### Usuários

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/api/users` | Cadastra um novo usuário | ❌ |
| `POST` | `/api/users/login` | Realiza login e retorna o token | ❌ |
| `GET` | `/api/users` | Lista todos os usuários | ✅ |

### Filmes

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `GET` | `/api/filmes` | Lista filmes com filtros e paginação | ✅ |
| `GET` | `/api/filmes/:id` | Busca um filme pelo ID | ✅ |
| `POST` | `/api/filmes` | Cria um novo filme | ✅ |
| `PUT` | `/api/filmes/:id` | Atualiza um filme | ✅ |
| `DELETE` | `/api/filmes/:id` | Deleta um filme | ✅ |

### Filtros e paginação disponíveis no `GET /api/filmes`

| Query param | Tipo | Descrição |
|-------------|------|-----------|
| `titulo` | string | Filtra por título |
| `genero` | string | Filtra por gênero |
| `ano` | integer | Filtra por ano |
| `page` | integer | Número da página (padrão: 1) |
| `limit` | integer | Itens por página (padrão: 10) |

**Exemplo:**
```
GET /api/filmes?genero=Drama&ano=2019&page=1&limit=5
```

## 📝 Exemplos de requisição

### Cadastro de usuário

```json
POST /api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Login

```json
POST /api/users/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Criar filme

```json
POST /api/filmes
Authorization: Bearer seu_token
Content-Type: application/json

{
  "titulo": "Interestelar",
  "genero": "Ficção Científica",
  "ano": 2014,
  "nota": 8.6
}
```

## 🛡️ Validações

Os dados são validados com **Zod** antes de chegar na camada de negócio:

- `titulo` e `genero` — string, mínimo 1 caractere
- `ano` — número entre 1900 e 2026
- `nota` — número entre 0 e 10
- Campos opcionais no `PUT` — todos os campos são opcionais na atualização

## 👨‍💻 Autor

**Augusto Freitas**

[![GitHub](https://img.shields.io/badge/GitHub-augustocrfreitas-181717?style=flat&logo=github)](https://github.com/augustocrfreitas)
