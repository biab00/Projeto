const Sequelize = require("sequelize")
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


const add = async (params) => {
    if (params.tipo == "livro") {
        const modelLivro = require("./livros");
        return await modelLivro.buscarLivros(params.nome);
    }
    if (params.tipo == "tv") {
        const modelTv = require("./tv");
        return await modelTv.buscarTV(params.nome);
    }
    if (params.tipo == "musica") {
        const modelMusica = require("./musicas");
        return await modelMusica.buscarMusicas(params.nome);
    }
    if (params.tipo == "jogo") {
        const modelJogo = require("./jogos");
        return await modelJogo.buscarJogos(params.nome);
    }
}

module.exports = {login, cadastro, add}