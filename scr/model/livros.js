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

const buscarLivros = async (nome) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${nome}`);
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

buscarIdLiv = async (id) => {
    try{
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        for(let i = 0; i<data.length; i++) {
            data[i].volumeInfo.publishedDate = new Date(data.volumeInfo.publishedDate).toLocaleDateString("pt-BR");
        }
        return data;
    } catch (error) {
        return { erro: error };
    }
}

const todos_livros = async () => {
    const liv = await livros.findAll()
    const todos_livros = [];
    for (let i = 0; i < liv.length; i++) {
        const id = liv[i].dataValues.id
        console.log(id)
        const livro = await buscarIdLiv(id);
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