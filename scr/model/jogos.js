const bd = require("../config/bd_sequelize");
const sequelize = require("sequelize");

// libreTranslate
async function traduzir(texto) {
    const response = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(texto) + "&langpair=en|pt");
    const data = await response.json();
    if (data.responseStatus !== 200) {
            return texto;
        }
    return data.responseData.translatedText;
}

const jogos = bd.define("Jogos", {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    }
});

jogos.sync({ alter: true })

//API 

const buscarId = async (id) => {
    const response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Client-ID": "gcrw5n4spp2ms1lr6t2rvdalidvgua",
            "Authorization": "Bearer vp9k3jnz9ual8tei6ivr86rj13lj09",
            "Accept": "application/json",
            "Content-Type": "text/plain",
            "Accept-Language": "pt-BR"
        },
        body: `
        fields name, id, involved_companies, first_release_date, platforms.name, summary, cover.url, rating, genres.name,themes.name;
            where id = ${id};
        `
    })
    const data = await response.json();
    for (let jogo of data) {
        if (jogo.involved_companies) {
            const desenvolvedores = [];
            for (let i = 0; i < jogo.involved_companies.length; i++) {
            const desenvolvedor = await fetch("https://api.igdb.com/v4/involved_companies", {
                method: "POST",
                headers: {
                    "Client-ID": "gcrw5n4spp2ms1lr6t2rvdalidvgua",
                    "Authorization": "Bearer vp9k3jnz9ual8tei6ivr86rj13lj09",
                    "Accept": "application/json",
                    "Content-Type": "text/plain",
                    "Accept-Language": "pt-BR"
                },
                body: `
        fields company.name;
        where id = ${jogo.involved_companies[i]};
        `
        
             })
            const dev = await desenvolvedor.json()
            dev.forEach(d => desenvolvedores.push(d.company.name));
            }
            jogo.involved_companies = desenvolvedores;
        }
        jogo.first_release_date = new Date(jogo.first_release_date * 1000).toLocaleDateString("pt-BR");
    }
    return data;
}

const buscarJogos = async (nome_jogo) => {
    const response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Client-ID": "gcrw5n4spp2ms1lr6t2rvdalidvgua",
            "Authorization": "Bearer vp9k3jnz9ual8tei6ivr86rj13lj09",
            "Accept": "application/json",
            "Content-Type": "text/plain",
            "Accept-Language": "pt-BR"
        },
        body: `
        fields name, id, involved_companies, first_release_date, platforms.name, summary, cover.url, rating, genres.name,themes.name;
            search "${nome_jogo}";
        `
    })
    const data = await response.json();
    for (let jogo of data) {
        if (jogo.involved_companies) {
            const desenvolvedores = [];
            for (let i = 0; i < jogo.involved_companies.length; i++) {
            const desenvolvedor = await fetch("https://api.igdb.com/v4/involved_companies", {
                method: "POST",
                headers: {
                    "Client-ID": "gcrw5n4spp2ms1lr6t2rvdalidvgua",
                    "Authorization": "Bearer vp9k3jnz9ual8tei6ivr86rj13lj09",
                    "Accept": "application/json",
                    "Content-Type": "text/plain",
                },
                body: `
        fields company.name;
        where id = ${jogo.involved_companies[i]};
        `
        
             })
            const dev = await desenvolvedor.json()
            dev.forEach(d => desenvolvedores.push(d.company.name));
            }

            jogo[0].summary = await traduzir(jogo[0].summary);

            jogo.involved_companies = desenvolvedores;
        }
        jogo.first_release_date = new Date(jogo.first_release_date * 1000).toLocaleDateString("pt-BR");
    }
    return data;
}


// Funções

const todos_jogos = async () => { 
    const jg = await jogos.findAll()
    const todos_jogos = [];
    for (let i = 0; i < jg.length; i++) {
        const jogo = await buscarId(jg[i].id);
        jogo[0].summary = await traduzir(jogo[0].summary);
        todos_jogos.push(jogo);
    }
    return todos_jogos;
}

const add = async (id) => {
    await jogos.create({
        id: id
    })
}

const delet = async (id) => {
    await jogos.destroy({
        where: { id: id }
    })
}

module.exports = { buscarJogos, todos_jogos, add, delet}