const bd = require("../config/bd_sequelize");
const sequelize = require("sequelize");

const chat = bd.define("Chat", {
  hora: {
    type: sequelize.STRING(50),
    allowNull: false,
  },
  mensagem: {
    type: sequelize.STRING(500),
    allowNull: false
  },
  usuario: {
    type: sequelize.STRING(200),
    allowNull: false
  },
});

chat.sync({alter: true})

const add = async (mensagem, user) => {
    await chat.create({
        hora: `${new Date().getHours()}h${new Date().getMinutes()}min`,
        mensagem: mensagem,
        usuario: user
    })  
}


const todos_chat = async () => { 
    const result = await chat.findAll()
    let total = []
    for(let i =0; i< result.length; i++){
        total.push(result[i].dataValues)
    }
    return total;
}

const delet = async () => {
  await chat.truncate();
};

module.exports = {todos_chat, add, delet}