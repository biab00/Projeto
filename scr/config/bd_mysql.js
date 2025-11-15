const mysql2 = require("mysql2");

const conn = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "aluno123",
    database: "banco_dados"
})

conn.connect((erro) => {
    if (erro) console.log("Não foi possível conectar ao banco: " + erro);
    else console.log("Banco conectado");
})

module.exports = conn;