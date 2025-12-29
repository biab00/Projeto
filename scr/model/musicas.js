const bd = require("../config/bd_sequelize");
const sequelize = require("sequelize"); 

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

buscarTopArte = async (id_artista) => {
    const response = await fetch(`https://api.deezer.com/artist/${id_artista}/top?limit=25`);
    const data = await response.json();
    return data.data
}

buscarArtista = async (id_artista) => {
    const response = await fetch(`https://api.deezer.com/artist/${id_artista}`);
    const data = await response.json();
    data.nb_fan = data.nb_fan.toLocaleString("pt-BR")
    return data   
}

const buscarMusicas = async (nome_musica) => {
    try{
        const response = await fetch(`https://api.deezer.com/search?q=${nome_musica}`);
        const data = await response.json();
        const musicas = [];
        for (let i = 0; i < data.data.length; i++) {
          const reponse = await fetch(`https://api.deezer.com/track/${data.data[i].id}`);
          const musica = await reponse.json(); 
          musicas.push(musica);
        }
        let todos = await musica.findAll();
        todos = todos.map(m => m.dataValues.id);
        for(let i = 0; i < musicas.length; i++){
            const audio = `${Math.floor(musicas[i].duration / 60)}min ${musicas[i].duration % 60}s`;
            musicas[i].release_date = new Date(musicas[i].release_date).toLocaleDateString("pt-BR");
            const data2 = await buscarTopArte(musicas[i].artist.id);
            for(let e=0; e<data2.length; e++){
                if(data2[e].id == musicas[i].id){
                    const top = e+1;
                    musicas[i].top = top;
                }}
                
            musicas[i].duration = audio;
            musicas[i].available_countries = musicas[i].available_countries.length;
            if (todos.includes(musicas[i].id)){
                musicas[i].adicionado = true;
            } else{
                musicas[i].adicionado = false;
            }
        }
        return musicas;
    } catch (error) {
        return {erro: error};
    }
}

const buscarMusicasId = async (id) => {
        const response = await fetch(`https://api.deezer.com/track/${id}`);
        const data = await response.json();
        const audio = (data.duration / 60).toFixed(1);
        data.duration = audio;
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

const delet = async (id) => {
    await musica.destroy({
        where: { id: id }
    })
}

module.exports = {buscarMusicas, todas_musicas, add, musica, delet, buscarArtista, buscarTopArte};