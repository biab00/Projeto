const db = require("../config/bd_sequelize");
const sequelize= require("sequelize");

const livros = db.define("Livros", {
    id:{
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});

livros.sync({ alter: true })

async function fetchWithTimeout(url, options = {}, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    options.signal = controller.signal;
    try {
        const res = await fetch(url, options);
        clearTimeout(id);
        return res;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

const buscarLivros = async (nome) => {
    try {
        const response = await fetchWithTimeout(`https://www.googleapis.com/books/v1/volumes?q=${nome}`);
        const data = await response.json();
        if (data.items) {
            data.items.forEach(item => {
                if (item.volumeInfo && item.volumeInfo.publishedDate) {
                    item.volumeInfo.publishedDate = new Date(item.volumeInfo.publishedDate).toLocaleDateString("pt-BR");
                }
            });
            return data.items;
        }
        return [];
    } catch (error) {
        return { erro: "Erro ao buscar livros: ", error };
    }
}

buscarId = async (id) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const data = await response.json();
    data.volumeInfo.publishedDate = new Date(data.volumeInfo.publishedDate).toLocaleDateString("pt-BR");
    return data;
}

const todos_livros = async () => {
    const liv = await livros.findAll()
    const todos_livros = [];
    for (let i = 0; i < liv.length; i++) {
        const livro = await buscarId(liv[i].id);
         todos_livros.push(livro);
    }

    return todos_livros;
}
const add = async (id) => {
    await livros.create({
        id: id
    })
}

const delet = async (id) => {
    await livros.destroy({
        where: { id: id }
    })
}

module.exports = {buscarLivros, todos_livros, add, delet};