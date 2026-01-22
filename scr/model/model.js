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
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    senha_cripto: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

cadastros.sync({ alter: true })

const conta = bd.define("Contas", {
    username: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true   
    },
    cor: {
        type: Sequelize.STRING,
         defaultValue: 'rgb(0,0,0)'
    },
    descricao: {
        type: Sequelize.STRING,
        defaultValue: 'Sem descrição (ainda)'
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: '/img/foto.jpg'
    }
})

conta.sync({alter: true})


const cadastro = async (params) => {
    const senhaCripto = await bcrypt.hash(params.senha, 10);
    await cadastros.create({
        nome: params.nome,
        username: params.username,
        senha_cripto: senhaCripto
    });
    await conta.create({
        username: params.username
    })
    await conta.belongsTo(cadastros, {foreignKey: "username"})
}

const login = async (params) => {
    const user = await cadastros.findOne({where: {username: params.username}});
    if (user) {
        if (await bcrypt.compare(params.senha, user.senha_cripto)) {
            return 1;
        } else {
            return "senha incorreta"
            }
    }
    return "usuario não encontrado";
}

const config = async (nome) => {
    return conta.findOne({
        where: {username: nome}
    })
}

const deleteConta = async (nome) => {
    await conta.destroy({
        where: { username: nome }
    })
    await cadastros.destroy({
        where: { username: nome }
    })
}

const dicionario = {
    Soap: "Novela",
    Documentary: "Documentário",
    Adventure: "Aventura",
    Animation: "Animação",
    Comedy: "Comédia",
    Action: "Ação",
    "Action & Adventure": "Ação e Aventura",
    Family: "Para Família",
    Horror: "Terror",
    Mystery: "Mistério",
    "Sci-Fi & Fantasy": "Ficção Científica & Fantasia",
    Thriller: "Suspense",
    TV_Movie: "Seriado de TV",
    War: "Guerra",
    Western: "Faroeste",
    Rumored: "Rumor (não confirmado)",
    Planned: "pré-produção",
    "In Production": "em produção",
    "Post Production": "pós produção",
    Airing: "No ar",
    Ended: "Finalizado",
    Canceled: "Cancelado",
    "Returning Series": "Novas temporadas chegando",
    Finished: "Produzido",
    Released: "Lançado"
}

const cor_aleatorio = () => {
    const r = Math.floor(Math.random() * 200)
    const g = Math.floor(Math.random() * 220)
    const b = Math.floor(Math.random() * 200)
    return `rgb(${r}, ${g}, ${b})`
}

const atualizar_conta = async (params) => {

    return await conta.update(
        {
            cor: params.cor,
        },{
        where: {username: params.nome}
    })
}

const todas_contas = async () => await conta.findAll()

const mensagem = bd.define("Mensagens", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  remetente: {
    type: Sequelize.STRING(200)
  },
  destinatario: {
    type: Sequelize.STRING(200)
  },
  tipo: {
    type: Sequelize.STRING(400)
  }
})

mensagem.sync({alter:true})

const todas_mensagens = async () => mensagem.findAll()

const addImg = async (src, username) => conta.update(
    { img: src }, {where: {username: username}}
)

const mudarDesc = async (params) => {
    await conta.update({
        descricao: params.descricao
    }, {where: {username: params.nome}})
}

module.exports = {login, cadastro, dicionario, cor_aleatorio, config, atualizar_conta,todas_mensagens, todas_contas, addImg, deleteConta, mudarDesc}