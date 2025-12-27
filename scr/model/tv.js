const db = require("../config/bd_sequelize");
const sequelize = require("sequelize"); 

const tv = db.define("TV", {
  nome: {
    type: sequelize.STRING(200),
    allowNull: false,
  },
  tipo: {
    type: sequelize.STRING(20),
  },
  ano: {
    type: sequelize.STRING(4),
  },
});

tv.sync({alter: true})

const buscarTV = async (nome) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=a3a6cb857a527d340a4234a5e2d1c7f5&language=pt-BR&query=${nome}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return {erro: "Erro ao buscar titulo:", error};
    }
}

const todos_tv = async () => tv.findAll()

module.exports = {buscarTV, todos_tv};