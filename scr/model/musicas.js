const bd = require("../config/bd_sequelize");
const sequelize = require("sequelize"); 
const fetch2 = require("node-fetch");


const musica = bd.define("Musica", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nome_musica: {
        type: sequelize.STRING(200)
    },
    banda: {
        type: sequelize.STRING(200)
    },
    anoMusica: {
        type: sequelize.INTEGER
    },
});

musica.sync({ alter: true })

const buscarMusicas = async (nome_musica) => {
    try{
        const response = await fetch(`https://api.deezer.com/search?q=${nome_musica}`);
        const data = await response.json();
        for(let i = 0; i < data.data.length; i++){
        const audio = (data.data[i].duration / 60).toFixed(2);
        data.data[i].duration = audio;
        }
        return data.data;
    } catch (error) {
        return {erro: "Erro ao buscar músicas:", error};
    }
}

const buscarMusicasId = async (id) => {
    console.log(id)
        const response = await fetch(`https://api.deezer.com/track/${id}`);
        console.log(JSON.stringify(response.Content));
        const data = await response.json();
        for(let i = 0; i < data.length; i++){
        const audio = (data[i].duration / 60).toFixed(2);
        data[i].duration = audio;
        }
        return data;
}

const todas_musicas = async () => {
    const mus = await musica.findAll()
    const todos_musicas = [];
    for (let i = 0; i < mus.length; i++) {
        const musica = await buscarMusicasId(mus[i].id);
         todos_musicas.push(musica);
    }
   
    return todos_musicas;
}
const add = async (id) => {
    await musica.create({
        id: id
    })
}
module.exports = {buscarMusicas, todas_musicas, add};