const db = require("../config/bd_sequelize");
const sequelize= require("sequelize");

const livros = db.define("Livros", {
    titulo: {
        type: sequelize.STRING(200),
        allowNull: false,
    },
    autor: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
    descricao: {
        type: sequelize.STRING(30),
    },
    isbn: {
        type: sequelize.INTEGER,
    },
});

livros.sync({ alter: true })

const buscarLivros = async (nome) => {
    try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${nome}`);
    const data = await response.json();
    return data;
    } catch (error) {
        return { erro: "Erro ao buscar livros: ", error };
    }}

const todos_livros = async () => livros.findAll()

module.exports = {buscarLivros, todos_livros};