const db = require("../config/bd_sequelize");
const sequelize = require("sequelize"); 

const tv = db.define("TV", {
  id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
  },
  tipo: {
    type: sequelize.STRING,
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
          const tv = await buscarIdtv(data.results[i].id);
          todos_tv.push(tv);
        }
        let todos = await tv.findAll();
        todos = todos.map(m => m.id);
        for (let i = 0; i < todos_tv.length; i++){
                    if (todos.includes(todos_tv[i].id)){
                        todos_tv[i].adicionado = true;
                    } else{
                        todos_tv[i].adicionado = false;
                    }
            }
        
        return todos_tv;
    } catch (error) {
        return {erro: "Erro ao buscar titulo:", error};
    }
}


const buscarIdtv = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=a3a6cb857a527d340a4234a5e2d1c7f5&language=pt-BR`);
    const data = await response.json();
    data.first_air_date = new Date(data.first_air_date).toLocaleDateString("pt-BR");
    data.last_air_date = new Date(data.last_air_date).toLocaleDateString("pt-BR");
    data.vote_average = (data.vote_average).toFixed(1);

    return data;
}

const todos_tv = async () => {
    const tvs = await tv.findAll()
    const todos_tv = [];
    for (let i = 0; i < tvs.length; i++) {
        let tv;
        if (tvs[i].tipo == "serie") {
            tv = await buscarIdtv(tvs[i].id);
            tv.tipo = "serie";
        } else {
            tv = await buscarIdFilme(tvs[i].id);
            tv.tipo = "filme";
        } 
        todos_tv.push(tv);
    }

    console.log("12: "+todos_tv)

    return todos_tv;
}
const add = async (id, tipo) => {
    await tv.create({
        id: id,
        tipo: tipo
    })
}

const delet = async (id) => {
    await tv.destroy({
        where: { id: id }
    })
}
const buscarIdFilme = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a3a6cb857a527d340a4234a5e2d1c7f5&language=pt-BR`);
    const data = await response.json();
    data.release_date = new Date(data.release_date).toLocaleDateString("pt-BR");
    data.vote_average = (data.vote_average).toFixed(1);
    if (data.runtime>0){
      data.runtime = `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`;
    } else{
      data.runtime = "Indefinido";
    }
    return data;
}

const buscarFilme = async (nome) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a3a6cb857a527d340a4234a5e2d1c7f5&language=pt-BR&query=${nome}`);
        const data = await response.json();
        const todos_filmes = [];
        for (let i = 0; i < data.results.length; i++) {
          const filme = await buscarIdFilme(data.results[i].id);
          todos_filmes.push(filme);
        }
        let todos = await tv.findAll();
        todos = todos.map(m => m.id);
        for (let i = 0; i < todos_filmes.length; i++){
                    if (todos.includes(todos_filmes[i].id)){
                        todos_filmes[i].adicionado = true;
                    } else{
                        todos_filmes[i].adicionado = false;
                    }
            }
        
        return todos_filmes;
    } catch (error) {
        return {erro: "Erro ao buscar titulo:", error};
    }
}

module.exports = {buscarTV, buscarFilme, todos_tv, add, delet};