const { Sequelize } = require("sequelize")
const bd = require("../config/bd_sequelize")
const bcrypt = require("bcrypt")

//CADASTROS
const cadastros = bd.define("Cadastros", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha_cripto: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

cadastros.sync({ alter: true })
// JOGOS
const jogos = bd.define("Jogos", {
    nome_jogo: {
        type: Sequelize.STRING(200)
    },
    criador: {
        type: Sequelize.STRING(20)
    },
    anoJogo: {
        type: Sequelize.INTEGER
    },
    plataforma: {
        type: Sequelize.STRING(60)
    },
});

jogos.sync({ alter: true })

//LIVROS
const livros = bd.define("Livros", {
    titulo: {
        type: Sequelize.STRING(200)
    },
    autor: {
        type: Sequelize.STRING(50)
    },
    descricao: {
        type: Sequelize.STRING(300)
    },
    isbn: {
        type: Sequelize.INTEGER
    },
});

livros.sync({ alter: true })

//TV
const tv = bd.define("TV", {
    nome_tv: {
        type: Sequelize.STRING(200)
    },
    categoria: {
        type: Sequelize.STRING(20)
    },
    anoTv: {
        type: Sequelize.INTEGER
    },
});

//MÚSICAS
const musica = bd.define("Musica", {
    nome_musica: {
        type: Sequelize.STRING(200)
    },
    banda: {
        type: Sequelize.STRING(200)
    },
    anoMusica: {
        type: Sequelize.INTEGER
    },
});


musica.sync({ alter: true })

const cadastro = async (params) => {
    const senhaCripto = await bcrypt.hash(params.senha, 10);
    await cadastros.create({
        nome: params.nome,
        username: params.username,
        senha_cripto: senhaCripto
    });
}

const login = async (params) => {
    const user = await cadastros.findOne({where: {username: params.username}});
    if (user) {
        if (bcrypt.compare(params.senha, user.senha_cripto)) return 1; 
        else return "senha incorreta"
    }
    return "usuario não encontrado";
}

const todos_jogos = async () => jogos.findAll()
const todos_tv = async () => tv.findAll()
const todos_livros = async () => livros.findAll()
const todas_musicas = async () => musica.findAll()

const add = async (params) => {
    if (params.tipo == "livro") {
        const isbn = parseInt(params.isbn, 10);
        return await livros.create({
            titulo: params.titulo,
            autor: params.autor,
            descricao: params.descricao,
            isbn: isbn
        });
    }
    if (params.tipo == "tv") {
        const ano = parseInt(params.anoTV, 10)
        return await tv.create({
            nome_tv: params.nome_tv,
            categoria: params.categoria,
            anoTv: ano
        });
    }
    if (params.tipo == "musica") {
        const ano = parseInt(params.anoMusica, 10)
        return await musica.create({
            nome_musica: params.nome_musica,
            banda: params.banda,
            anoMusica: ano
        });
    }
}

module.exports = {login, cadastro, todos_jogos, todos_tv, todos_jogos, todos_livros, add, todas_musicas }