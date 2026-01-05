const bd = require("../config/bd_sequelize");
const sequelize= require("sequelize");

const lista = bd.define("Lista", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    feito: {
        type: sequelize.BOOLEAN
    }
})

lista.sync({alter: true})

const count = async () => await lista.count()

const todos = async () => await lista.findAll()

const add = async (params) => await lista.create({
        nome: params.nome,
        feito: false 
    })

const delet = async (id) => await lista.destroy({
    where: {id: id}
})

const atualizar = async (params) => await lista.update(
    {
        feito: params.feito
    },{
    where: {
        id: params.id
    }
})

module.exports = {add, delet, todos, atualizar, count}