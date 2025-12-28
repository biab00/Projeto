const db = require("../config/bd_sequelize");
const sequelize = require("sequelize"); 

const tv = db.define("TV", {
  id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
  }
});

tv.sync({alter: true})

const buscarTV = async (nome) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=a3a6cb857a527d340a4234a5e2d1c7f5&language=pt-BR&query=${nome}`);
        const data = await response.json();
        const todos_tv = [];
        for (let i = 0; i < data.results.length; i++) {
          const tv = await buscarId(data.results[i].id);
          tv.vote_average = (data.results[i].vote_average).toFixed(1);
          todos_tv.push(tv);
        }
        
        return todos_tv;
    } catch (error) {
        return {erro: "Erro ao buscar titulo:", error};
    }
}


buscarId = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=a3a6cb857a527d340a4234a5e2d1c7f5&language=pt-BR`);
    const data = await response.json();
    data.first_air_date = new Date(data.first_air_date).toLocaleDateString("pt-BR");
    return data;
}

const todos_tv = async () => {
    const tvs = await tv.findAll()
    const todos_tv = [];
    for (let i = 0; i < tvs.length; i++) {
        const tv = await buscarId(tvs[i].id);
         todos_tv.push(tv);
    }

    return todos_tv;
}
const add = async (id) => {
    await tv.create({
        id: id
    })
}

const delet = async (id) => {
    await tv.destroy({
        where: { id: id }
    })
}


module.exports = {buscarTV, todos_tv, add, delet, tv};