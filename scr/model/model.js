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

const dicionario = {
    Soap: "Novela",
    Documentary: "Documentário",
    Adventure: "Aventura",
    Animation: "Animação",
    Comedy: "Comédia",
    Action: "Ação",
    Family: "Para Família",
    Horror: "Terror",
    Mystery: "Mistério",
    SciFic: "Ficção Científica",
    Thriller: "Suspense",
    TV_Movie: "Seriado de TV",
    War: "Guerra",
    Western: "Faroeste"
}



module.exports = {login, cadastro, dicionario}