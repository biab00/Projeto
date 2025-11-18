const bd = require("../config/bd_mysql")

const iniciarBD = async () => {
    await bd.promise().query("CREATE TABLE IF NOT EXISTS Cadastros(nome VARCHAR(200), username VARCHAR(20), senha_cripto VARCHAR(30));")
}

const cadastro = async (params) => {
    await bd.promise().query(`INSERT INTO Cadastros(nome, username, senha_cripto) VALUES ("${params.nome}", "${params.username}","${params.senha}")`)
}



const login = async (params) => {
    const [user_senha] = await bd.promise().query(`SELECT senha_cripto FROM Cadastros WHERE username = "${params.username}";`);
    if (user_senha[0]) if (user_senha[0].senha_cripto == params.senha) return "Usuario logado"; else return "senha incorreta"
    return "usuario não encontrado";
}

module.exports = {iniciarBD, login, cadastro}