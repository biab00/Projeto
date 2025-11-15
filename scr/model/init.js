const bd = require("../config/bd_mysql")

const iniciarBD = async () => {
    await bd.promise().query("CREATE TABLE IF NOT EXISTS Cadastros(nome VARCHAR(200), username VARCHAR(20), senha_cripto VARCHAR(30));")
}

const login = async (params) => {
    await bd.promise().query(`INSERT INTO Cadastros(nome, username, senha_cripto) VALUES ("${params.nome}", "${params.username}","${params.senha}")`)
}

module.exports = {iniciarBD, login}